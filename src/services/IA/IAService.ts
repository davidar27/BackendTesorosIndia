import { getCategoriesRepository } from "@/repositories/Category/getCategoriesRepository";
import { getAllExperienceRepository } from "@/repositories/Experience/getAllExperienceRepository";
import { getPackagesRepository } from "@/repositories/Package/getPackagesRepository";
import { getProductsByCategoryRepository } from "@/repositories/Product/getProductsByCategoryRepository";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Importaciones de módulos refactorizados
import { AI_MODELS, MODEL_PREFERENCE, globalConfig, Roles } from "./models/AIModels";
import { DataRequirement, ContextData } from "./models/DataRequirements";
import { predefinedResponses, PredefinedResponseKey } from "./cache/PredefinedResponses";
import { getCachedResponse, cacheResponse, clearCache, getCacheStats } from "./cache/CacheManager";
import { detectCommonQuery, extractAndCleanJSON, cleanResponse, formatObject, isAffirmativeResponse } from "./utils/ResponseFormatter";
import { transformHistoryForGoogleGenAI } from "./utils/HistoryTransformer";
import { SYSTEM_PROMPT } from "./prompts/SystemPrompts";
import { createAnalysisPrompt, createUnifiedPrompt } from "./prompts/PromptTemplates";

dotenv.config();

const { AI_API_KEY = "" } = process.env;
const ai = new GoogleGenAI({ apiKey: AI_API_KEY });

// Configurar el system prompt en la configuración global
const configWithSystemPrompt = {
    ...globalConfig,
    systemInstruction: SYSTEM_PROMPT,
};

class IAService {
    static async getResponse(prompt: string, history: any[], role: Roles = "observador", id_user: number = 0, category_id?: number) {
        try {
            // 1. Verificar caché primero
            const cachedResponse = getCachedResponse(prompt, role, category_id || 0);
            if (cachedResponse) {
                console.log("Using cached response");
                return cachedResponse;
            }

            // 2. Verificar respuestas predefinidas
            const commonQuery = detectCommonQuery(prompt);
            if (commonQuery && predefinedResponses[commonQuery as PredefinedResponseKey]) {
                const predefinedResponse = predefinedResponses[commonQuery as PredefinedResponseKey];
                cacheResponse(prompt, role, category_id || 0, predefinedResponse);
                return predefinedResponse;
            }

            // 3. Si no hay caché ni respuesta predefinida, usar IA
            if (isAffirmativeResponse(prompt)) {
                // Si la última respuesta fue la de paquetes_general, muestra los paquetes directamente
                const dataRequirement: DataRequirement = {
                    needsExperiences: false,
                    needsProducts: false,
                    needsPackages: true,
                    needsSales: false,
                    responseType: 'PACKAGE' as DataRequirement['responseType']
                };
                const contextData = await this.gatherRequiredData(dataRequirement, id_user, role, category_id || 0);
                const response = await this.generateUnifiedResponse(prompt, history, role, id_user, dataRequirement, contextData);
                cacheResponse(prompt, role, category_id || 0, response);
                return response;
            }

            const dataRequirement = await this.analyzeDataRequirements(prompt, role);
            const contextData = await this.gatherRequiredData(dataRequirement, id_user, role, category_id || 0);
            const response = await this.generateUnifiedResponse(prompt, history, role, id_user, dataRequirement, contextData);

            // 4. Guardar en caché
            cacheResponse(prompt, role, category_id || 0, response);

            return response;
        } catch (error: any) {
            console.error("Error getting AI response:", error);

            // Manejo específico para errores de cuota
            if (error.message && error.message.includes('429')) {
                return predefinedResponses.quota_exceeded;
            }

            return predefinedResponses.error_general;
        }
    }

    static async analyzeDataRequirements(prompt: string, role: Roles): Promise<DataRequirement> {
        const analysisPrompt = createAnalysisPrompt(prompt, role);

        // Intentar con diferentes modelos
        for (const model of MODEL_PREFERENCE) {
            try {
                console.log(`Trying model: ${model}`);
                const chat = ai.chats.create({
                    model: model,
                    history: [],
                    config: configWithSystemPrompt,
                });

                const response: any = await chat.sendMessage({
                    message: analysisPrompt,
                });

                const cleanedResponse = extractAndCleanJSON(response.text);
                return JSON.parse(cleanedResponse);
            } catch (error: any) {
                console.error(`Error with model ${model}:`, error.message);

                // Si es error de cuota, continuar con el siguiente modelo
                if (error.message && error.message.includes('429')) {
                    continue;
                }

                // Si es otro tipo de error, continuar con el siguiente modelo
                continue;
            }
        }

        // Si todos los modelos fallan, usar respuesta por defecto
        console.error("All AI models failed, using default response");
        return {
            needsExperiences: false,
            needsProducts: false,
            needsPackages: false,
            needsSales: false,
            responseType: 'GENERAL'
        };
    }

    static async gatherRequiredData(dataRequirement: DataRequirement, id_user: number, role: Roles, category_id: number): Promise<ContextData> {
        const contextData: ContextData = {
            info: await formatObject({
                appName: "Tesoros de la India",
                description: "Plataforma para descubrir experiencias culturales, productos y paquetes turísticos de la vereda la India aledaña a Filandia, Quindio, Colombia"
            })
        };

        if (dataRequirement.needsExperiences) {
            try {
                const experiences: any = await getAllExperienceRepository();
                contextData.experiences = await formatObject(experiences);
            } catch (error) {
                console.error("Error fetching experiences:", error);
                contextData.experiences = "[]";
            }
        }


        if (dataRequirement.responseType === 'PRODUCT_CATEGORIES') {
            try {
                const categories = await getCategoriesRepository();
                console.log(categories);
                
                contextData.productCategories = await formatObject(categories);
            } catch (error) {
                console.error("Error fetching product categories:", error);
                contextData.productCategories = "[]";
            }
        }


        if (dataRequirement.needsProducts && dataRequirement.responseType === 'PRODUCT') {
            try {
                const products: any = await getProductsByCategoryRepository(category_id);
                console.log(products);

                contextData.products = await formatObject(products);
                console.log(contextData);

            } catch (error) {
                console.error("Error fetching products:", error);
                contextData.products = "[]";
            }
        }



        if (dataRequirement.needsPackages ) {
            try {
                const packages: any = await getPackagesRepository();
                console.log(packages);

                contextData.packages = await formatObject(packages);
            } catch (error) {
                console.error("Error fetching packages:", error);
                contextData.packages = "[]";
            }
        }

        if (dataRequirement.needsSales && role === "emprendedor" && id_user > 0) {
            try {
                // Aquí iría la llamada a tu repositorio de ventas
                const sales: any = []; // await SalesRepository.getByEntrepreneur(id_user);
                contextData.sales = await formatObject(sales);
            } catch (error) {
                console.error("Error fetching sales:", error);
                contextData.sales = "[]";
            }
        }

        return contextData;
    }

    static async generateUnifiedResponse(
        prompt: string,
        history: any[],
        role: Roles,
        id_user: number,
        dataRequirement: DataRequirement,
        contextData: ContextData
    ): Promise<string> {
        // Transform history to be compatible with Google GenAI
        const transformedHistory = transformHistoryForGoogleGenAI(history);
        const unifiedPrompt = createUnifiedPrompt(prompt, role, id_user, dataRequirement, contextData);

        // Intentar con diferentes modelos
        for (const model of MODEL_PREFERENCE) {
            try {
                console.log(`Trying model for response: ${model}`);
                const chat = ai.chats.create({
                    model: model,
                    history: transformedHistory,
                    config: configWithSystemPrompt,
                });

                const response: any = await chat.sendMessage({
                    message: unifiedPrompt,
                });

                return cleanResponse(response.text);
            } catch (error: any) {
                console.error(`Error with model ${model} for response:`, error.message);

                // Si es error de cuota, continuar con el siguiente modelo
                if (error.message && error.message.includes('429')) {
                    continue;
                }

                // Si es otro tipo de error, continuar con el siguiente modelo
                continue;
            }
        }

        // Si todos los modelos fallan, usar respuesta predefinida
        console.error("All AI models failed for response generation, using predefined response");
        return predefinedResponses.error_general;
    }

    // Métodos de utilidad para administración
    static clearCache(): void {
        clearCache();
    }

    static getCacheStats(): { size: number; entries: string[] } {
        return getCacheStats();
    }
}

export default IAService;