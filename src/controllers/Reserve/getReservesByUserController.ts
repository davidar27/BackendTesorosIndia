import { getReservesByUserService } from '@/services/Reserve/getReservesByUserService';
import { Request, Response } from 'express';

export const getReservesByUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId: id_user } = req.body
        const reserves = await getReservesByUserService(id_user);
        res.status(200).json(reserves);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener las reservas del cliente"
        });
    }
}; 