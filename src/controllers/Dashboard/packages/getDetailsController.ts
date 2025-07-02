import { getDetailService } from '@/services/Dashboard/packages/getDetailService';
import { Request, Response } from 'express';

export const getDetailsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const details = await getDetailService();
        res.status(200).json(details);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener los detalles" 
        });
    }
}; 