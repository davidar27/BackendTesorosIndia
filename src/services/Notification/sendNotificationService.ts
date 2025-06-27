import { NotificationModel } from "@/models/Notification/notification";
import { sendNotificationsRepository } from "@/repositories/Notification/sendNotificationRepository";
import { sendNotificationEmailService } from "./sendNotificationEmailService";
import { User } from "@/models/User/User";
import { findUserByIdRepository } from "@/repositories/User/findUserByIdRepository";

export const sendNotificationService = async (notification: NotificationModel) => {
    const user: User = await findUserByIdRepository(notification.user_id as number) as User
    await sendNotificationsRepository(notification);
    await sendNotificationEmailService(user.email, notification)
}; 