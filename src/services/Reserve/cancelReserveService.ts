import { Reserve } from "@/models/Reserve/Reserve";
import { reserveRepository } from "@/repositories/Reserve/reserveRepository";
import { sendNotificationService } from "../Notification/sendNotificationService";
import { NotificationModel } from "@/models/Notification/Notification";
import { getContentReserveNotification } from "@/helpers/Email/getContentReserveNotification";
import { findUserByRoomRepository } from "@/repositories/User/findUserByRoomRepository";
import { getReserveByIdRepository } from "@/repositories/Reserve/getReserveByIdRepository";

export const cancelReserveService = async (reserve_id: number, user_id: number) => {
    const reserve: Reserve = await getReserveByIdRepository(reserve_id);
    const entrepreneur = await findUserByRoomRepository(reserve.room_id as number)
    let content = await getContentReserveNotification("entrepreneur", "Cancelacion", reserve, entrepreneur)
    // await cancelReserveRepository(reserve_id, user_id)
    const notificationEntrepreneur: NotificationModel = {
        type: "Cancelación",
        message: "Te han cancelado la reserva de una habitacion",
        user_id: entrepreneur.user_id,
        content: content,
    }
    content = await getContentReserveNotification("client", "Cancelacion", reserve, entrepreneur)
    const notificationClient: NotificationModel = {
        type: "Cancelación",
        message: "Has cancelado la reserva de una habitacion",
        user_id: user_id,
        content: content
    }
    await sendNotificationService(notificationEntrepreneur)
    await sendNotificationService(notificationClient)
}; 