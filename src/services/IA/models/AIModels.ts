import { HarmCategory, HarmBlockThreshold, GenerateContentConfig } from "@google/genai";

// Configuración de modelos disponibles
export const AI_MODELS = {
    gemini_2_flash: "gemini-2.0-flash",
    gemini_1_5_flash: "gemini-1.5-flash",
    gemini_1_5_pro: "gemini-1.5-pro"
} as const;

// Orden de preferencia de modelos
export const MODEL_PREFERENCE = [
    AI_MODELS.gemini_2_flash,
    AI_MODELS.gemini_1_5_flash,
    AI_MODELS.gemini_1_5_pro
] as const;

// Configuración global para Gemini
export const globalConfig: GenerateContentConfig = {
    temperature: 0.35,
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ],
};

export type Roles = 'observador' | 'emprendedor'; 