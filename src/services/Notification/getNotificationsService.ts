import { getNotificationsRepository } from "@/repositories/Notification/getNotificationsRepository";

export const getNotificationsService = async (userId: number) => {
    console.log(userId);

    return await getNotificationsRepository(userId);
}; 