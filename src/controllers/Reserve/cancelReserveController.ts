import { cancelReserveService } from '@/services/Reserve/cancelReserveService';
import { Request, Response } from 'express';

export const cancelReserveController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reserve_id } = req.query;
        const { userId: user_id } = req.body;
        const result = await cancelReserveService(Number(reserve_id), user_id);
        res.send(`
            <html>
                <head>
                    <meta http-equiv="refresh" content="5;url=https://tesoros-india.vercel.app/" />
                </head>
                <body>
                    <p>${result || "Reserva cancelada con éxito"}</p>
                    <p>Serás redirigido a la página principal en 5 segundos...</p>
                </body>
            </html>
        `);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al cancelar la reserva"
        });
    }
};