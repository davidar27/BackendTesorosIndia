import { deleteUnverifiedUsers } from "@/repositories/User/deleteUnverifiedUsers ";

export const removeUnverifiedUsers = async (): Promise<void> => {
    try {
        await deleteUnverifiedUsers();
        console.log('[CRON] Unverified users successfully deleted.');
    } catch (error) {
        console.error('[CRON] Failed to delete unverified users:', error);
    }
};
