import { getNotificationsRepository } from "@/repositories/Notification/getNotificationsRepository";

export const getNotificationsService = async (userId: number) => {
    return await getNotificationsRepository(userId);
}; 