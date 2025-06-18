import { getExperienceMembersService } from '@/services/Experience/getExperienceMembersService';
import { Request, Response } from 'express';

export const getExperienceMembersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getExperienceMembersService();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener las categorías" 
        });
    }
}; 