import { User } from '@/models/User/User';
import { findUserByIdRepository } from '@/repositories/User/findUserByIdRepository';

export const findByIdUserService = async (userId: number): Promise<User | null> => {
    try {        
        const user = await findUserByIdRepository(userId);
        return user;
    } catch (error) {
        throw error;
    }
};


