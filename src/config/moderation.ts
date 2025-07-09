export const moderationConfig = {
    // Umbral de toxicidad (0.0 - 1.0) - Más bajo para detectar más contenido
    toxicityThreshold: 0.5,

    // Umbral de confianza para bloquear contenido - Más bajo para ser más estricto
    confidenceThreshold: 0.6,

    // Categorías de toxicidad que se detectan (deben coincidir con las del modelo)
    toxicCategories: [
        'toxicity',
        'severe_toxicity',
        'identity_attack',
        'insult',
        'obscene',
        'sexual_explicit',
        'threat'
    ],

    // Configuración de logging
    logging: {
        enabled: true,
        logToxicContent: true,
        logSafeContent: false
    },

    // Configuración de fallback
    fallback: {
        allowOnError: true, // Permitir contenido si hay error en el análisis
        retryAttempts: 3
    },

    // Configuración de rendimiento
    performance: {
        maxTextLength: 1000, // Longitud máxima de texto a analizar
        timeout: 5000 // Timeout en milisegundos
    }
}; 