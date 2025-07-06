import { sendNotificationService } from "../Notification/sendNotificationService";
import { NotificationModel } from "@/models/Notification/Notification";
import { cancelBuyRepository } from "@/repositories/payment/cancelBuyRepository";
import { getBuyEntrepreneursService } from "./getBuyEntrepreneursService";
import { getContentBuyNotification } from "@/helpers/Email/getContentBuyNotification";

export const cancelBuyService = async (bill_id: number, user_id: number) => {
    const result = await cancelBuyRepository(bill_id, user_id)
    if (result.affectedRows == 0) {
        return "La compra no se ha podido cancelar con exito."
    }

    let content = await getContentBuyNotification("client", "Cancelacion", bill_id)
    const notificationClient: NotificationModel = {
        type: "Cancelación",
        message: "Compra cancelada",
        user_id: user_id,
        content: content
    }
    await sendNotificationService(notificationClient)

    const entrepreneurs: any = await getBuyEntrepreneursService(bill_id)
    entrepreneurs.forEach(async (entrepreneur: any) => {
        content = await getContentBuyNotification("entrepreneur", "Cancelacion", bill_id, entrepreneur.entrepreneur_id)
        const notificationEntrepreneur: NotificationModel = {
            type: "Cancelación",
            message: "Te han cancelado una compra",
            user_id: entrepreneur.entrepreneur_id,
            content: content,
        }
        await sendNotificationService(notificationEntrepreneur)
    })

    return "Compra cancelada con exito."
}; 