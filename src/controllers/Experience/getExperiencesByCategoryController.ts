import { Request, Response } from 'express';
import { getExperiencesByCategoryService } from '@/services/Experience/getExperiencesByCategoryService';

export const getExperiencesByCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = Number(req.params.categoryId);
        const experiences = await getExperiencesByCategoryService(categoryId);
        
        res.status(200).json(experiences);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener las experiencias por categoría" 
        });
    }
}; 