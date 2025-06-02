import { Request, Response } from 'express';
import { getDashboardCategoriesService } from '@/services/Dashboard/category/getDashboardCategoriesService';

export const getDashboardCategoriesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getDashboardCategoriesService();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener las categorías del dashboard" 
        });
    }
}; 