import { Request, Response } from 'express';

export const cancelReserveController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reserve_id } = req.query
        // await cancelReserveService(parseInt(reserve_id));
        res.redirect("")
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener las reservas del hostal"
        });
    }
}; 