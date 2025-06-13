import { getCategoriesService } from '@/services/Category/getCategoriesService';
import { Request, Response } from 'express';

export const getCategoriesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getCategoriesService();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener las categorías" 
        });
    }
}; 