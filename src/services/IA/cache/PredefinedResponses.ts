export const predefinedResponses = {
    greeting: "¡Hola! Soy Tesorito, tu asistente virtual de Tesoros de la India. Te ayudo a descubrir las maravillas culturales de las veredas aledañas al municipio de Filandia, Quindío, Colombia. ¿En qué puedo ayudarte hoy?",
    
    products_general: "¡Hola! Tenemos varias categorías de productos artesanales únicos de nuestra región. ¿Qué tipo de productos te interesa? Aquí tienes nuestras categorías disponibles:",
    
    experiences_general: "¡Excelente! Tenemos experiencias culturales increíbles que te permitirán sumergirte en la riqueza de nuestra región. ¿Te gustaría conocer nuestras experiencias disponibles?",
    
    packages_general: "¡Perfecto! Nuestros paquetes turísticos combinan las mejores experiencias y productos de la región. ¿Te gustaría conocer nuestras opciones de paquetes?",
    
    quota_exceeded: "Lo siento, en este momento estamos experimentando una alta demanda. Por favor, intenta nuevamente en unos minutos o contacta con nuestro equipo de soporte.",
    
    error_general: "Disculpa, estoy teniendo dificultades técnicas en este momento. Por favor, intenta nuevamente o contacta con nuestro equipo de soporte."
} as const;

export type PredefinedResponseKey = keyof typeof predefinedResponses; 