import { Request, Response } from 'express';
import { getDashboardFarmsService } from '@/services/Dashboard/getDashboardFarmsService';

export const getDashboardFarmsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const farms = await getDashboardFarmsService();
        res.status(200).json(farms);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener las fincas del dashboard" 
        });
    }
}; 