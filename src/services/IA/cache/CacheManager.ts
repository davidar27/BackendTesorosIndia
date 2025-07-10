// Sistema de caché simple
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

// Función para limpiar caché expirado
function cleanExpiredCache(): void {
    const now = Date.now();
    for (const [key, value] of responseCache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
            responseCache.delete(key);
        }
    }
}

// Función para generar clave de caché
function generateCacheKey(prompt: string, role: string, category_id: number): string {
    return `${prompt.toLowerCase().trim()}_${role}_${category_id}`;
}

// Función para obtener respuesta del caché
export function getCachedResponse(prompt: string, role: string, category_id: number): string | null {
    cleanExpiredCache();
    const cacheKey = generateCacheKey(prompt, role, category_id);
    const cached = responseCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        return cached.response;
    }
    
    return null;
}

// Función para guardar respuesta en caché
export function cacheResponse(prompt: string, role: string, category_id: number, response: string): void {
    const cacheKey = generateCacheKey(prompt, role, category_id);
    responseCache.set(cacheKey, {
        response,
        timestamp: Date.now()
    });
}

// Método para limpiar caché manualmente
export function clearCache(): void {
    responseCache.clear();
}

// Método para obtener estadísticas del caché
export function getCacheStats(): { size: number; entries: string[] } {
    cleanExpiredCache();
    return {
        size: responseCache.size,
        entries: Array.from(responseCache.keys())
    };
} 