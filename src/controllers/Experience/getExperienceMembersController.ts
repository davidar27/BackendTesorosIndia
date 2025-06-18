import { getExperienceMembersService } from '@/services/Experience/getExperienceMembersService';
import { Request, Response } from 'express';

export const getExperienceMembersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const members = await getExperienceMembersService();
        res.status(200).json(members);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener los integrantes de la experiencia" 
        });
    }
}; 