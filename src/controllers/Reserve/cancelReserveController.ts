import { ACCESS_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { verifyTokenPayload } from '@/helpers/Tokens/verifyTokenPayload';
import { cancelReserveService } from '@/services/Reserve/cancelReserveService';
import { Request, Response } from 'express';

export const cancelReserveController = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.query.token as string;
        const data = verifyTokenPayload(
            token,
            ACCESS_TOKEN_SECRET
        );
        if (!data.data.userId) {
            res.status(400).json('Token de acceso inválido');
            return
        }

        const { reserve_id } = req.query;
        const result = await cancelReserveService(Number(reserve_id), data.data.userId);
        res.status(200).json(result)
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al cancelar la reserva"
        });
    }
};