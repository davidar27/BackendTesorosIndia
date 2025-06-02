import { Request, Response } from 'express';
import { getEntrepreneursService } from '@/services/Dashboard/entrepreneur/getEntrepreneursService';

export const getEntrepreneursController = async (req: Request, res: Response): Promise<void> => {
    try {
        const entrepreneurs = await getEntrepreneursService();
        res.status(200).json(entrepreneurs );
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener los emprendedores del dashboard" 
        });
    }
}; 