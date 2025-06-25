import { Request, Response } from 'express';

export const webhookController = async (req: Request, res: Response) => {
    try {
        // Mercado Pago envía notificaciones por POST
        const data = req.body;
        // Aquí puedes procesar el evento, por ejemplo guardar el pago en la base de datos
        // Puedes filtrar por data.type === 'payment', etc.
        // Ejemplo: console.log('Webhook recibido:', data);

        res.status(200).send('OK');
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}; 