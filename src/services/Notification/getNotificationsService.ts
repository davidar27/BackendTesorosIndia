import { getNotificationsRepository } from "@/repositories/Notification/getNotificationsRepository";

export const getNotificationsService = async (user_id: number) => {
    return await getNotificationsRepository(user_id);
}; 