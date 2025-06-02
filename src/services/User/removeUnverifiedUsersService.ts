import { removeUnverifiedUsersRepository } from '@/repositories/User/removeUnverifiedUsersRepository';

export const removeUnverifiedUsersService = async (): Promise<number> => {
    try {
        const deletedCount = await removeUnverifiedUsersRepository();
        return deletedCount;
    } catch (error) {
        throw error;
    }
};
