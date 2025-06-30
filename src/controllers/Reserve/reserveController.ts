import { Reserve } from '@/models/Reserve/Reserve';
import { reserveService } from '@/services/Reserve/reserveService';
import { Request, Response } from 'express';

export const reserveController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { room_id } = req.params
        const { reserve_date, userId: user_id } = req.body
        const reserve: Reserve = {
            room_id: parseInt(room_id),
            user_id: user_id,
            reserve_date: reserve_date,
            state: 'Pendiente'
        }
        await reserveService(reserve);
        res.status(200).json("Hostal reservado con exito.");
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al reservar el hostal."
        });
    }
}; 