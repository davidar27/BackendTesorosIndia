import { getPackageService } from '@/services/Dashboard/packages/getPackageService';
import { Request, Response } from 'express';

export const getPackageController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const pack = await getPackageService(parseInt(id));
        res.status(200).json(pack);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener el paquete"
        });
    }
}; 