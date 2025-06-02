import { getEntrepreneursRepository } from "@/repositories/Dashboard/entreprenaur/getEntrepreneursRepository";

export const getEntrepreneursService = async () => {
    try {
        const entrepreneurs = await getEntrepreneursRepository();
        
        // Convertir las URLs de las imágenes al formato correcto
        const entrepreneursWithUrls = entrepreneurs.map(entrepreneur => {
            if (!entrepreneur.image) {
                return entrepreneur;
            }

            // Si la imagen ya tiene la ruta /images/, la dejamos como está
            if (entrepreneur.image.startsWith('/images/')) {
                return entrepreneur;
            }

            // Si no, asumimos que es un nombre de blob y construimos la URL
            return {
                ...entrepreneur,
                image: `/images/${entrepreneur.image}`
            };
        });

        return entrepreneursWithUrls;
    } catch (error) {
        throw error;
    }
}; 