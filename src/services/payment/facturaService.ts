import { createFactura, createFacturaDetalle, findFacturaByPaymentId } from '@/repositories/payment/facturaRepository';

export const registrarFacturaConDetalles = async (
    total: number,
    usuario_id: number,
    items: Array<{ servicio_id: number, cantidad: number, precio_unitario: number }>,
    paymentId: number
) => {
    let factura_id = await findFacturaByPaymentId(paymentId);

    if (!factura_id) {
        factura_id = await createFactura(total, 'pagada', usuario_id, paymentId);

        for (const item of items) {
            await createFacturaDetalle(factura_id, item.servicio_id, item.cantidad, item.precio_unitario);
        }
    }

    return factura_id;
};