import { Request, Response } from 'express';
import { getDashboardPackagesService } from '@/services/Dashboard/packages/getDashboardPackagesService';

export const getDashboardPackagesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const packages = await getDashboardPackagesService();
        res.status(200).json(packages);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener los paquetes del dashboard" 
        });
    }
}; 