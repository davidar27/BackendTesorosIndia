import { getEntrepreneurService } from '@/services/User/getEntrepreneurService';
import { Request, Response } from 'express';

export const getEntrepreneurController = async (req: Request, res: Response): Promise<void> => {
    try {
        const entrepreneur = await getEntrepreneurService();        
        res.status(200).json(entrepreneur);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener los emprendedores" 
        });
    }
}; 