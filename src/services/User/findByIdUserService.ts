import { User } from '@/models/User/User';
import { findEntrepreneurByIdRepository } from '@/repositories/Dashboard/entreprenaur/findEntrepreneurByIdRepository';

export const findByIdUserService = async (userId: number): Promise<User | null> => {
    try {
        console.log(userId);
        
        const user = await findEntrepreneurByIdRepository(userId);
        return user;
    } catch (error) {
        throw error;
    }
};


