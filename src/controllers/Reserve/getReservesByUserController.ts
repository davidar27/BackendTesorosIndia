import { getReservesByUserService } from '@/services/Reserve/getReservesByUserService';
import { Request, Response } from 'express';

export const getReservesByUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId: user_id } = req.body
        const reserves = await getReservesByUserService(user_id);
        res.status(200).json(reserves);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener las reservas del cliente"
        });
    }
}; 