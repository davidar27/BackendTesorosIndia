import { setViewNotificationsRepository } from "@/repositories/Notification/setViewNotificationsRepository";

export const setViewNotificationsService = async (user_id: number) => {
    return await setViewNotificationsRepository(user_id);
}; 