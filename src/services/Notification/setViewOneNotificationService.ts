import { setViewOneNotificationRepository } from "@/repositories/Notification/setViewOneNotificationRepository";

export const setViewOneNotificationService = async (notificationId: number) => {
    return await setViewOneNotificationRepository(notificationId);
}; 