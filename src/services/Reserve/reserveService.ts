import { Reserve } from "@/models/Reserve/Reserve";
import { reserveRepository } from "@/repositories/Reserve/reserveRepository";
import { sendNotificationService } from "../Notification/sendNotificationService";
import { NotificationModel } from "@/models/Notification/Notification";
import { findUserByIdRepository } from "@/repositories/User/findUserByIdRepository";

export const reserveService = async (reserve: Reserve) => {
    const entrepreneur = []
    const client = await findUserByIdRepository(reserve.user_id as number) as any
    const notificationEntrepreneur: NotificationModel = {
        type: "General",
        message: "Te han reservado una habitacion",
        content: `El usuario ${client.correo} ${client.telefono} ${client.nombre} ha reservado la habitacion ${"tal"} del hostal ${"tal"} para la fecha ${"tal"}`
    }
    const notificationClient: NotificationModel = {
        type: "General",
        message: "Has reservado una habitacion",
        user_id: reserve.user_id,
        content: `Has reservado un paquete la habitacion ${"tal"} del hostal ${"tal"} para la fecha ${"tal"}`
    }
    await sendNotificationService(notificationEntrepreneur)
    await sendNotificationService(notificationClient)
    await reserveRepository(reserve);
}; 