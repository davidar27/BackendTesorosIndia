import { getProductsExperienceService } from '@/services/Experience/getProductsExperienceService';
import { Request, Response } from 'express';

export const getProductsExperienceController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { experience_id } = req.params
        const products = await getProductsExperienceService(parseInt(experience_id));
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener las categorías"
        });
    }
}; 