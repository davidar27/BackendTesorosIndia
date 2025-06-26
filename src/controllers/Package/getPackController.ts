import { getPackageService } from '@/services/Package/getPackageService';
import { Request, Response } from 'express';

export const getPackageController = async (req: Request, res: Response): Promise<void> => {
    try {
        const pack = await getPackageService();
        res.status(200).json(pack);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener el paquete" 
        });
    }
}; 