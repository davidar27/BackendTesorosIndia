import { getPacksService } from '@/services/Pack/getPackagesService';
import { Request, Response } from 'express';

export const getPacksController = async (req: Request, res: Response): Promise<void> => {
    try {
        const packs = await getPacksService();
        res.status(200).json(packs);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener los paquetes" 
        });
    }
}; 