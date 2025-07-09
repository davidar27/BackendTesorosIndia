export const predefinedResponses = {
    greeting: "¡Hola! Soy Tesorito, tu guía turístico virtual de Tesoros de la India. Te ayudo a descubrir las maravillas de la vereda La India, cerca de Filandia, Quindío. ¿En qué puedo ayudarte?",
    
    no_idea: "¡No te preocupes! Te ofrecemos experiencias culturales, productos artesanales, paquetes turísticos y tours. ¿Qué te gustaría explorar?",
    
    products_general: "¡Genial! Tenemos productos artesanales únicos de nuestra región. ¿Qué te interesa?",
    
    experiences_general: "¡Perfecto! Tenemos experiencias culturales increíbles. ¿Quieres conocerlas?",
    
    packages_general: "¡Excelente! Nuestros paquetes combinan las mejores experiencias. ¿Te gustaría ver las opciones?",
    
    quota_exceeded: "Lo siento, alta demanda. Intenta en unos minutos.",
    
    error_general: "Disculpa, tengo problemas técnicos. Intenta de nuevo."
} as const;

export type PredefinedResponseKey = keyof typeof predefinedResponses; 