import { Request, Response } from 'express';
import { mercadopagoClient } from '@/config/mercadopago';
import { Payment } from 'mercadopago';
import { registrarFacturaConDetalles } from '@/services/payment/facturaService';

export const paymentController = async (req: Request, res: Response) => {
    try {
        // console.log('--- Webhook recibido ---');
        // console.log('Método:', req.method);
        // console.log('Headers:', req.headers);
        // console.log('Body:', JSON.stringify(req.body, null, 2));

        const type = req.body.type || req.query.type;
        const paymentId = req.body?.data?.id || req.query['data.id'];

        if (!paymentId || type !== 'payment') {
            console.log('ℹ️ Webhook ignorado: tipo o ID faltante');
            return res.status(200).send('Evento ignorado');
        }

        const paymentInstance = new Payment(mercadopagoClient);
        const payment = await paymentInstance.get({ id: paymentId });




        const {
            id,
            status,
            status_detail,
            transaction_amount,
            payer,
            payment_method_id,
            date_created,
            transaction_details,
            external_reference,
            metadata,
        } = payment;


        // console.log('✅ Datos de pago recibidos:');
        // console.log('🔹 ID de pago:', id);
        // console.log('🔹 Estado:', status);
        // console.log('🔹 Detalle del estado:', status_detail);
        // console.log('🔹 Monto:', transaction_amount);
        // console.log('🔹 Método de pago:', payment_method_id);
        // console.log('🔹 Fecha de creación:', date_created);
        // console.log('🔹 Referencia externa:', external_reference);
        // console.log('🔹 URL del comprobante:', transaction_details?.external_resource_url ?? 'No disponible');

        // console.log('👤 Pagador:');

        // console.log('🧾 Metadata enviada:');
        // console.dir(metadata, { depth: null });

        // // Mostrar los servicios comprados
        // if (metadata?.items?.length) {
        //     console.log('📦 Servicios comprados:');
        //     metadata.items.forEach((item: any, index: number) => {
        //         console.log(`  🔸 Servicio ${index + 1}:`);
        //         console.log(`     - ID: ${item.servicio_id}`);
        //         console.log(`     - Cantidad: ${item.cantidad}`);
        //         console.log(`     - Precio unitario: $${item.precio_unitario}`);
        //     });
        // } else {
        //     console.log('❗ No se encontraron servicios en metadata.items');
        // }

        if (status === 'approved') {
            console.log('Intentando guardar en la base de datos...');
            if (typeof transaction_amount !== 'number') {
                throw new Error('transaction_amount is missing or invalid');
            }
            await registrarFacturaConDetalles(
                transaction_amount,
                Number(metadata.user_id),
                metadata.items
            );
            console.log('¡Guardado exitoso en la base de datos!');
        }

        return res.status(200).send('OK');
    } catch (error: any) {
        console.error('❌ Error en webhook:', error.message);
        return res.status(500).json({ error: 'Error al procesar el webhook' });
    }
};
