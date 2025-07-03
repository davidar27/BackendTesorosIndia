import { Reserve } from "@/models/Reserve/Reserve";
import { reserveRepository } from "@/repositories/Reserve/reserveRepository";
import { sendNotificationService } from "../Notification/sendNotificationService";
import { NotificationModel } from "@/models/Notification/Notification";
import { findUserByIdRepository } from "@/repositories/User/findUserByIdRepository";
import { getContentReserveNotification } from "@/helpers/Email/getContentReserveNotification";
import { findUserByRoomRepository } from "@/repositories/User/findUserByRoomRepository";

export const reserveService = async (reserve: Reserve) => {
    const entrepreneur = await findUserByRoomRepository(reserve.room_id as number)
    const client = await findUserByIdRepository(reserve.user_id as number) as any
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
    await reserveRepository(reserve);
}; 