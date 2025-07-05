import { Request, Response } from 'express';
import { mercadopagoClient } from '@/config/mercadopago';
import { Payment } from 'mercadopago';

export const paymentController = async (req: Request, res: Response) => {
    try {
        console.log('🔔 Webhook recibido:', JSON.stringify(req.body, null, 2));

        const type = req.body.type || req.query.type;
        const paymentId = req.body?.data?.id || req.query['data.id'];



        if (!paymentId || type !== 'payment') {
            console.log('ℹ️ Webhook ignorado: tipo o ID faltante');
            return res.status(200).send('Evento ignorado');
        }

        // Obtener datos completos del pago
        const paymentInstance = new Payment(mercadopagoClient);
        const { id, status, status_detail, transaction_amount, payer, payment_method_id, date_created, transaction_details, external_reference, metadata } =
            await paymentInstance.get({ id: paymentId });


        console.log('✅ Datos de pago recibidos:');
        console.log('🔹 ID de pago:', id);
        console.log('🔹 Estado:', status);
        console.log('🔹 Detalle del estado:', status_detail);
        console.log('🔹 Monto:', transaction_amount);
        console.log('🔹 Método de pago:', payment_method_id);
        console.log('🔹 Fecha de creación:', date_created);
        console.log('🔹 External reference:', external_reference);
        console.log('🔹 URL del comprobante:', transaction_details?.external_resource_url ?? 'No disponible');

        console.log('👤 Datos del pagador:');
        console.log('   - Nombre:', `${payer?.first_name ?? ''} ${payer?.last_name ?? ''}`.trim());
        console.log('   - Email:', payer?.email ?? 'No disponible');

        console.log('🧾 Metadata enviada:');
        console.dir(metadata, { depth: null });


        // // Guardar o actualizar en la base de datos
        // await savePaymentToDatabase({
        //     id,
        //     status,
        //     status_detail,
        //     amount: transaction_amount,
        //     payer_email: payer?.email,
        //     payer_name: `${payer?.first_name} ${payer?.last_name}`,
        //     payment_method: payment_method_id,
        //     created_at: date_created,
        //     external_reference,
        //     receipt_url: transaction_details?.external_resource_url ?? null,
        // });

        return res.status(200).send('OK');
    } catch (error: any) {
        console.error('❌ Error en webhook:', error.message);
        return res.status(500).json({ error: 'Error al procesar el webhook' });
    }
};
