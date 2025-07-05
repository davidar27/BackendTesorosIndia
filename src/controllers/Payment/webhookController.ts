import { Request, Response } from 'express';
import { mercadopagoClient } from '@/config/mercadopago';
import { Payment } from 'mercadopago';

export const webhookController = async (req: Request, res: Response) => {
    try {
        console.log('🔔 Webhook recibido:', JSON.stringify(req.body, null, 2)); // log completo

        const paymentId = req.query['data.id'] || req.body?.data?.id;
        const topic = req.query.type || req.body?.type;

        if (topic === 'payment' && paymentId) {
            const paymentInstance = new Payment(mercadopagoClient);
            const payment = await paymentInstance.get({ id: paymentId });
            console.log('✅ Pago obtenido:', payment);

            return res.status(200).send('OK');
        }

        return res.status(200).send('Evento ignorado');
    } catch (error: any) {
        console.error('❌ Error en webhook:', error.message);
        return res.status(500).json({ error: error.message });
    }
};
