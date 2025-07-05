import { Request, Response } from 'express';
import { mercadopagoClient } from '@/config/mercadopago';
import { Payment } from 'mercadopago';

export const webhookController = async (req: Request, res: Response) => {
    try {
        // Mercado Pago puede enviar el id por query o body
        const paymentId = req.query['data.id'] || req.body?.data?.id;
        const topic = req.query.type || req.body?.type;

        if (topic === 'payment' && paymentId) {
            const paymentInstance = new Payment(mercadopagoClient);
            const payment = await paymentInstance.get({ id: paymentId });
            const paymentData = payment;

            // Aquí actualizas tu base de datos según el estado del pago
            // Ejemplo:
            // await updateOrderStatus(paymentData.external_reference, paymentData.status);

            // Puedes loguear para debug
            console.log('Pago recibido:', paymentData); 

            return res.status(200).send('OK');
        }

        // Si no es un evento relevante, igual responde 200
        return res.status(200).send('Evento ignorado');
    } catch (error: any) {
        console.error('Error en webhook:', error);
        return res.status(500).json({ error: error.message });
    }
}; 