import { getEntrepreneursRepository } from "@/repositories/Dashboard/entreprenaur/getEntrepreneursRepository";

export const getEntrepreneursService = async () => {
    try {
        const entrepreneurs = await getEntrepreneursRepository();
        
        const entrepreneursWithUrls = entrepreneurs.map(entrepreneur => {
            if (!entrepreneur.image) {
                return entrepreneur;
            }

            if (entrepreneur.image.startsWith('/images/')) {
                return entrepreneur;
            }

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