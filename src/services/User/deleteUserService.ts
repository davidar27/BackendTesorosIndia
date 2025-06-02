import { deleteUserRepository } from '@/repositories/User/deleteUserRepository';

export const deleteUserService = async (userId: number): Promise<void> => {
    try {
        await deleteUserRepository(userId);
    } catch (error) {
        throw error;
    }
};
