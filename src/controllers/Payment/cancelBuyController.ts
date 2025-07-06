import { cancelBuyService } from '@/services/payment/cancelBuyService';
import { Request, Response } from 'express';

export const cancelBuyController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bill_id } = req.query;
        const { userId: user_id } = req.body;
        const result = await cancelBuyService(Number(bill_id), user_id);
        res.send(`
            <html>
                <head>
                    <meta http-equiv="refresh" content="5;url=https://tesoros-india.vercel.app/" />
                </head>
                <body>
                    <p>${result || "Compra cancelada con éxito"}</p>
                    <p>Serás redirigido a la página principal en 5 segundos...</p>
                </body>
            </html>
        `);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al cancelar la compra"
        });
    }
};