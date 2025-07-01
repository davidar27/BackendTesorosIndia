import { Reserve } from "@/models/Reserve/Reserve";
import { reserveRepository } from "@/repositories/Reserve/reserveRepository";
import { sendNotificationService } from "../Notification/sendNotificationService";
import { NotificationModel } from "@/models/Notification/Notification";

export const reserveService = async (reserve: Reserve) => {
    const notification: NotificationModel = {
        type: "General",
        message: ``,
        user_id: reserve.user_id,
    }
    await sendNotificationService(notification)
    await reserveRepository(reserve);
}; 