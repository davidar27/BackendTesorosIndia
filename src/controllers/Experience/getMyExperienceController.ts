import { Request, Response } from 'express';
import { getMyExperienceService } from '@/services/Experience/getMyExperienceService';

export const getMyExperienceController = async (req: Request, res: Response): Promise<void> => {
    try {
        const emprendedorId = req.body.userId;
        const experience = await getMyExperienceService(emprendedorId);
        
        if (!experience) {
            res.status(404).json({ 
                error: "No se encontró una experiencia asociada a este emprendedor" 
            });
            return;
        }
        
        res.status(200).json(experience);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener la experiencia del emprendedor" 
        });
    }
}; 