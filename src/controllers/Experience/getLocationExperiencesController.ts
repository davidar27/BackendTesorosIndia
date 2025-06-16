import { getLocationExperiencesService } from '@/services/Experience/getLocationExperiencesService';
import { Request, Response } from 'express';

export const getLocationExperiencesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const locations = await getLocationExperiencesService();
        res.status(200).json(locations);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener las categorías" 
        });
    }
}; 