// Función para detectar consultas comunes
export function detectCommonQuery(prompt: string): string | null {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('hola') || lowerPrompt.includes('buenos días') || lowerPrompt.includes('buenas')) {
        return 'greeting';
    }
    
    if (lowerPrompt.includes('productos') && !lowerPrompt.includes('categoría') && !lowerPrompt.includes('específico')) {
        return 'products_general';
    }
    
    if (lowerPrompt.includes('experiencias') || lowerPrompt.includes('actividades')) {
        return 'experiences_general';
    }
    
    if (lowerPrompt.includes('paquetes') || lowerPrompt.includes('tours')) {
        return 'packages_general';
    }
    
    return null;
}

export function extractAndCleanJSON(response: string): string {
    let cleaned = response.replace(/```json\s*/gi, '').replace(/```/g, '');

    cleaned = cleaned.trim();

    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }

    return cleaned;
}

export function cleanResponse(response: string): string {
    return response.replace(/^\s+|\s+$/g, "").replace(/\n/g, " ");
}

export async function formatObject(object: any): Promise<string> {
    return JSON.stringify(object, null, 2);
} 

export function isAffirmativeResponse(prompt: string): boolean {
    const affirmatives = ["sí", "si", "ok", "dale", "quiero ver", "claro", "muéstrame", "mostrar", "ver", "por favor"];
    const lower = prompt.trim().toLowerCase();
    return affirmatives.some(a => lower === a || lower.startsWith(a + " "));
} 