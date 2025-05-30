if (!process.env.BREVO_API_KEY) {
    console.warn('⚠️ BREVO_API_KEY no está configurada en las variables de entorno');
}

if (!process.env.FRONTEND_URL) {
    console.warn('⚠️ FRONTEND_URL no está configurada en las variables de entorno, usando valor por defecto');
}

export const config = {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
}