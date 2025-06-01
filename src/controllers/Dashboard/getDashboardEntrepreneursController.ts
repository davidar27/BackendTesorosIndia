import { Request, Response } from 'express';
import { getDashboardEntrepreneursService } from '@/services/Dashboard/getDashboardEntrepreneursService';

export const getDashboardEntrepreneursController = async (req: Request, res: Response): Promise<void> => {
    try {
        const entrepreneurs = await getDashboardEntrepreneursService();
        res.status(200).json(entrepreneurs);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener los emprendedores del dashboard" 
        });
    }
}; 