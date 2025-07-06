import { createFactura, createFacturaDetalle, findFacturaByPaymentId } from '@/repositories/payment/facturaRepository';
import { sendNotificationService } from '../Notification/sendNotificationService';
import { getContentBuyNotification } from '@/helpers/Email/getContentBuyNotification';
import { NotificationModel } from '@/models/Notification/Notification';
import { getBuyEntrepreneursService } from './getBuyEntrepreneursService';

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

        let content = await getContentBuyNotification("client", "Compra", factura_id)
        const notificationClient: NotificationModel = {
            type: "General",
            message: "Compra realizada",
            user_id: usuario_id,
            content: content
        }
        await sendNotificationService(notificationClient)

        const entrepreneurs: any = await getBuyEntrepreneursService(factura_id)
        entrepreneurs.forEach(async (entrepreneur: any) => {
            content = await getContentBuyNotification("entrepreneur", "Compra", factura_id, entrepreneur.entrepreneur_id)
            const notificationEntrepreneur: NotificationModel = {
                type: "General",
                message: "Te han realizado una compra",
                user_id: entrepreneur.entrepreneur_id,
                content: content,
            }
            await sendNotificationService(notificationEntrepreneur)
        })
    }

    return factura_id;
};