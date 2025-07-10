import { setViewNotificationsRepository } from "@/repositories/Notification/setViewNotificationsRepository";

export const setViewNotificationsService = async (userId: number) => {
    return await setViewNotificationsRepository(userId);
}; 