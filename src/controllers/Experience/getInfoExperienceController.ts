import { getInfoExperienceService } from '@/services/Experience/getInfoExperienceService';
import { Request, Response } from 'express';

export const getInfoExperienceController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getInfoExperienceService();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener las categorías" 
        });
    }
}; 