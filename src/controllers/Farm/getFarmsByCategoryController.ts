import { Request, Response } from 'express';
import { getFarmsByCategoryService } from '@/services/Farm/getFarmsByCategoryService';

export const getFarmsByCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = Number(req.params.categoryId);
        const farms = await getFarmsByCategoryService(categoryId);
        
        res.status(200).json(farms);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener las fincas por categoría" 
        });
    }
}; 