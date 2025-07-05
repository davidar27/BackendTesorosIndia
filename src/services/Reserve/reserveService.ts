import { Reserve } from "@/models/Reserve/Reserve";
import { reserveRepository } from "@/repositories/Reserve/reserveRepository";
import { sendNotificationService } from "../Notification/sendNotificationService";
import { NotificationModel } from "@/models/Notification/Notification";
import { getContentReserveNotification } from "@/helpers/Email/getContentReserveNotification";
import { findUserByRoomRepository } from "@/repositories/User/findUserByRoomRepository";

export const reserveService = async (reserve: Reserve) => {
    const result = await reserveRepository(reserve);
    if (!result.insertId) {
        return "Habitacion no reservada"
    }
    reserve.reserve_id = result.insertId;
    const entrepreneur = await findUserByRoomRepository(reserve.room_id as number)
    let content = await getContentReserveNotification("entrepreneur", "Reserva", reserve, entrepreneur)
    const notificationEntrepreneur: NotificationModel = {
        type: "General",
        message: "Te han reservado una habitacion",
        user_id: entrepreneur.user_id,
        content: content,
    }
    content = await getContentReserveNotification("client", "Reserva", reserve, entrepreneur)
    const notificationClient: NotificationModel = {
        type: "General",
        message: "Has reservado una habitacion",
        user_id: reserve.user_id,
        content: content
    }
    await sendNotificationService(notificationEntrepreneur)
    await sendNotificationService(notificationClient)
    return "Habitacion reservada con exito."
}; 