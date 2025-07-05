import { createFactura, createFacturaDetalle } from '@/repositories/payment/facturaRepository';

export const registrarFacturaConDetalles = async (
    total: number,
    usuario_id: number,
    items: Array<{ servicio_id: number, cantidad: number, precio_unitario: number }>
) => {
    const factura_id = await createFactura(total, 'pagada', usuario_id);

    for (const item of items) {
        await createFacturaDetalle(factura_id, item.servicio_id, item.cantidad, item.precio_unitario);
    }

    return factura_id;
};