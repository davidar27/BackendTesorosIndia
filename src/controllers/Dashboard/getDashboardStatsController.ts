import { Request, Response } from 'express';
import { getDashboardStatsService } from '@/services/Dashboard/getDashboardStatsService';

export const getDashboardStatsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const stats = await getDashboardStatsService();
        res.status(200).json(stats);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener las estadísticas del dashboard" 
        });
    }
}; 