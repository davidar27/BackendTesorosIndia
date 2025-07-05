import { cancelReserveService } from '@/services/Reserve/cancelReserveService';
import { Request, Response } from 'express';

export const cancelReserveController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reserve_id } = req.query
        const { userId: user_id } = req.body
        await cancelReserveService(Number(reserve_id), user_id);
        res.redirect("")
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener las reservas del hostal"
        });
    }
}; 