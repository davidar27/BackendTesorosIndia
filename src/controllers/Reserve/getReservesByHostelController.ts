import { getReservesByHostelService } from '@/services/Reserve/getReservesByHostelService';
import { Request, Response } from 'express';

export const getReservesByHostelController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_hostel } = req.params
        const reserves = await getReservesByHostelService(parseInt(id_hostel));
        res.status(200).json(reserves);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener las reservas del hostal"
        });
    }
}; 