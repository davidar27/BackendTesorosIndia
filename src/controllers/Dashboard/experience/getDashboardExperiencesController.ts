import { Request, Response } from 'express';
import { getDashboardExperiencesService } from '@/services/Dashboard/experience/getDashboardExperiencesService';

export const getDashboardExperiencesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const experiences = await getDashboardExperiencesService();
        res.status(200).json(experiences);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener las experiencias del dashboard" 
        });
    }
}; 