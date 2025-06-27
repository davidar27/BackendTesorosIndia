import { NotificationModel } from "@/models/Notification/notification";
import { sendNotificationsRepository } from "@/repositories/Notification/sendNotificationRepository";

export const sendNotificationService = async (notification: NotificationModel) => {
    // enviar correo
    return await sendNotificationsRepository(notification);
}; 