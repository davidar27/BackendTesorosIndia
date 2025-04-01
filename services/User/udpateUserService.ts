import { User } from '../../models/User/user';
import { updateUserRepository } from '../../repositories/User/updateUserRepository';

export const udpateUserService = async (gUseId: number, userData: User) => {
    await updateUserRepository(gUseId, userData);
};