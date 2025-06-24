import { Request, Response } from 'express';
import { mercadopagoClient, Preference } from '../../config/mercadopago';

export const createBrickPreferenceController = async (req: Request, res: Response) => {
    const FRONTEND_URL = process.env.FRONTEND_URL
    try {
        const { items, total, payer, back_urls, metadata } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'No items provided' });
        }

        const preference = {
            items: items.map((item: any) => ({
                id: item.id?.toString(),
                title: item.name,
                quantity: item.quantity,
                unit_price: item.price,
                currency_id: 'COP',
            })),
            payer,
            back_urls: {
                success: `{${FRONTEND_URL}}/pago-exitoso`,
                failure: `${FRONTEND_URL}/pago-fallido`,
                pending: `${FRONTEND_URL}/pago-pendiente`
            },
            metadata,
            auto_return: 'approved',
            notification_url: process.env.MP_WEBHOOK_URL || '',
        };

        const preferenceInstance = new Preference(mercadopagoClient);
        const response = await preferenceInstance.create({ body: preference });
        return res.status(200).json({
            preferenceId: response.id,
            init_point: response.init_point,
        });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}; 