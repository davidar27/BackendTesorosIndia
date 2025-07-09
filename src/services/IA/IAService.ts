import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Importaciones de módulos refactorizados
import { MODEL_PREFERENCE, globalConfig, Roles } from "./models/AIModels";
import { AIResponse, IntentData } from "./models/DataRequirements";
import { predefinedResponses, PredefinedResponseKey } from "./cache/PredefinedResponses";
import { getCachedResponse, cacheResponse, clearCache, getCacheStats } from "./cache/CacheManager";
import { detectCommonQuery, cleanResponse, isAffirmativeResponse } from "./utils/ResponseFormatter";
import { transformHistoryForGoogleGenAI } from "./utils/HistoryTransformer";
import { SYSTEM_PROMPT } from "./prompts/SystemPrompts";
import { IntentDetector } from "./utils/IntentDetector";
import { RowDataPacket } from 'mysql2';
// Importar los servicios de experiencia
import { getTopProductsByExperienceService } from '../Experience/getTopProductsByExperienceService';
import { getTotalIncomeByExperienceService } from '../Experience/getTotalIncomeByExperienceService';
import { findByIdUserService } from '../User/findByIdUserService';

dotenv.config();

const { AI_API_KEY = "" } = process.env;
const ai = new GoogleGenAI({ apiKey: AI_API_KEY });

// Configurar el system prompt en la configuración global
const configWithSystemPrompt = {
    ...globalConfig,
    systemInstruction: SYSTEM_PROMPT,
};

class IAService {
    static async getResponse(prompt: string, history: any[], role: Roles = "observador", id_user: number = 0, category_id?: number, experiencia_id?: number): Promise<AIResponse> {
        try {
            // Obtener contexto del historial para detectar intención
            const context = this.getContextFromHistory(history);

            // 1. Verificar caché primero
            const cachedResponse = getCachedResponse(prompt, role, category_id || 0);
            if (cachedResponse) {
                console.log("Using cached response");
                let intent = this.detectIntentFromPrompt(prompt, context);
                // Si el rol no es emprendedor y la intención es confidencial, limpiar botones y mensaje
                if (role !== 'emprendedor' && (intent.type === 'total_income_by_experience' || intent.type === 'top_products_by_experience')) {
                    intent = { ...intent, message: '', buttonText: '' };
                }
                return this.createAIResponse(cachedResponse, intent);
            }

            // 2. Verificar respuestas predefinidas 
            const commonQuery = detectCommonQuery(prompt);
            if (commonQuery && (commonQuery === 'greeting' || commonQuery === 'no_idea') && predefinedResponses[commonQuery as PredefinedResponseKey]) {
                const predefinedResponse = predefinedResponses[commonQuery as PredefinedResponseKey];
                let intent = this.detectIntentFromPrompt(prompt, context);
                if (role !== 'emprendedor' && (intent.type === 'total_income_by_experience' || intent.type === 'top_products_by_experience')) {
                    intent = { ...intent, message: '', buttonText: '' };
                }
                cacheResponse(prompt, role, category_id || 0, predefinedResponse);
                return this.createAIResponse(predefinedResponse, intent);
            }

            // 3. Verificar respuestas afirmativas simples
            if (isAffirmativeResponse(prompt)) {
                let intent = this.detectIntentFromPrompt(prompt, context);
                if (role !== 'emprendedor' && (intent.type === 'total_income_by_experience' || intent.type === 'top_products_by_experience')) {
                    intent = { ...intent, message: '', buttonText: '' };
                }
                const response = "¡Perfecto! Te ayudo con eso.";
                cacheResponse(prompt, role, category_id || 0, response);
                return this.createAIResponse(response, intent);
            }

            // 4. Detectar intención
            let intent = this.detectIntentFromPrompt(prompt, context);

            // Si el rol no es emprendedor y la intención es confidencial, limpiar botones y mensaje
            if (role !== 'emprendedor' && (intent.type === 'total_income_by_experience' || intent.type === 'top_products_by_experience')) {
                intent = { ...intent, redirectTo:'show_packages', message: 'Mejor mira nuestros paquetes :)', buttonText: 'Mirar Paquetes' };
            }

            // Si es emprendedor y la intención requiere experiencia_id, obtenerlo si no se pasa
            let experienciaIdFinal = experiencia_id;
            if (role === 'emprendedor' && !experienciaIdFinal && id_user) {
                const user = await findByIdUserService(id_user);
                experienciaIdFinal = user?.experience_id;
            }

            // 4.1. Si es emprendedor y la intención es top_products_by_experience
            if (role === 'emprendedor' && intent.type === 'top_products_by_experience' && experienciaIdFinal) {
                const productos = await getTopProductsByExperienceService(experienciaIdFinal);
                let response = 'Top 3 productos más vendidos:';
                if (!Array.isArray(productos) || productos.length === 0) {
                    response = 'No hay ventas registradas para esta experiencia.';
                }
                cacheResponse(prompt, role, category_id || 0, response);
                return this.createAIResponse(response, intent, productos);
            }

            // 4.2. Si es emprendedor y la intención es total_income_by_experience
            if (role === 'emprendedor' && intent.type === 'total_income_by_experience' && experienciaIdFinal) {
                const ingresos = await getTotalIncomeByExperienceService(experienciaIdFinal);
                let response = 'Total de ingresos generados:';
                const rows = ingresos as RowDataPacket[];
                if (!Array.isArray(rows) || rows.length === 0 || rows[0].total_income === null) {
                    response = 'No hay ingresos registrados para esta experiencia.';
                }
                cacheResponse(prompt, role, category_id || 0, response);
                return this.createAIResponse(response, intent, rows);
            }

            // Si el rol no es emprendedor y la intención es confidencial, responder con mensaje de confidencialidad
            if (role !== 'emprendedor' && (intent.type === 'total_income_by_experience' || intent.type === 'top_products_by_experience')) {
                const response = '¡Hola!  Esa información es confidencial y solo está disponible para los emprendedores registrados en Tesoros de la India.  Contacta a nuestro equipo de soporte para más detalles.';
                return this.createAIResponse(response, intent);
            }

            // 5. Si no hay caché ni respuesta predefinida, usar IA solo para análisis
            const response = await this.generateSimpleResponse(prompt, history, role, id_user);
            // 6. Guardar en caché
            cacheResponse(prompt, role, category_id || 0, response);
            return this.createAIResponse(response, intent);
        } catch (error: any) {
            console.error("Error getting AI response:", error);
            // Manejo específico para errores de cuota
            if (error.message && error.message.includes('429')) {
                return this.createAIResponse(predefinedResponses.quota_exceeded, this.createNoIntent());
            }
            return this.createAIResponse(predefinedResponses.error_general, this.createNoIntent());
        }
    }

    private static detectIntentFromPrompt(prompt: string, context?: string): IntentData {
        return IntentDetector.detectIntent(prompt, context);
    }

    private static createNoIntent(): IntentData {
            return {
            type: 'none',
            confidence: 0,
            redirectTo: 'none',
            message: "",
            buttonText: ""
        };
    }

    private static createAIResponse(text: string, intent: IntentData, data?: any): AIResponse {
        // Si hay data, inclúyela en la respuesta
        if (data !== undefined) {
            return {
                text,
                intent,
                data
            } as any;
        }
        return {
            text,
            intent
        };
    }

    static async generateSimpleResponse(
        prompt: string,
        history: any[],
        role: Roles,
        id_user: number
    ): Promise<string> {
        // Transform history to be compatible with Google GenAI
        const transformedHistory = transformHistoryForGoogleGenAI(history);
        
        // Prompt que pide respuestas concisas y directas
        const simplePrompt = `Eres Tesorito, el guía virtual de Tesoros de la India.
        
        SOBRE NOSOTROS:
        Tesoros de la India conecta la comunidad rural de la vereda La India con el mundo digital, exponiendo nuestra riqueza cultural y productiva.
        
        OFRECEMOS:
        - Experiencias culturales
        - Productos artesanales
        - Paquetes turísticos
        - Tours guiados
        
        IMPORTANTE:
        - Sé CONCISO y directo
        - Máximo 2-3 frases por respuesta
        - NO uses formato JSON
        - NO incluyas precios o detalles técnicos
        
        Consulta: ${prompt}
        
        Responde de forma breve y amigable:`;

        for (const model of MODEL_PREFERENCE) {
            try {
                console.log(`Trying model for simple response: ${model}`);
                const chat = ai.chats.create({
                    model: model,
                    history: transformedHistory,
                    config: configWithSystemPrompt,
                });

        const response: any = await chat.sendMessage({
                    message: simplePrompt,
                });

                const cleanedText = cleanResponse(response.text);
                
                if (cleanedText.includes('{') && cleanedText.includes('}')) {
                    const textBeforeJson = cleanedText.split('{')[0].trim();
                    return textBeforeJson || "¡Perfecto! Te ayudo con eso.";
                }
                
                return cleanedText;
            } catch (error: any) {
                console.error(`Error with model ${model} for simple response:`, error.message);

                if (error.message && error.message.includes('429')) {
                    continue;
                }

                continue;
            }
        }

        console.error("All AI models failed for simple response generation, using predefined response");
        return predefinedResponses.error_general;
    }

    // Métodos de utilidad para administración
    static clearCache(): void {
        clearCache();
    }

    static getCacheStats(): { size: number; entries: string[] } {
        return getCacheStats();
    }

    private static getContextFromHistory(history: any[]): string {
        if (!history || history.length === 0) {
            return "";
        }

        // Obtener solo el último mensaje del bot para entender el contexto más reciente
        const botMessages = history
            .filter((msg: any) => msg.role === 'assistant' || msg.role === 'model')
            .slice(-1) // Solo el último mensaje
            .map((msg: any) => msg.content || msg.text || "")
            .join(" ");

        return botMessages;
    }
}

export default IAService;