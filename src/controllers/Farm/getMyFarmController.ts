import { Request, Response } from 'express';
import { getMyFarmService } from '@/services/Farm/getMyFarmService';

export const getMyFarmController = async (req: Request, res: Response): Promise<void> => {
    try {
        const emprendedorId = req.body.userId;
        const farm = await getMyFarmService(emprendedorId);
        
        if (!farm) {
            res.status(404).json({ 
                error: "No se encontró una finca asociada a este emprendedor" 
            });
            return;
        }
        
        res.status(200).json(farm);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener la finca del emprendedor" 
        });
    }
}; 