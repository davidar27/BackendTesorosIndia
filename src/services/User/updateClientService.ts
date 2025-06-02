import { User } from '@/models/User/User';
import { updateUserRepository } from '@/repositories/User/updateUserRepository';
import { findByIdUserService } from './findByIdUserService';

interface UpdateClientData {
    userId: number;
    name?: string;
    phone?: string;
    image?: string;
    address?: string;
}

export const updateClientService = async (userData: UpdateClientData): Promise<User> => {
    try {
        const currentUser = await findByIdUserService(userData.userId);
        if (!currentUser) {
            throw new Error('Usuario no encontrado');
        }

        if (currentUser.role !== 'cliente') {
            throw new Error('El usuario no es un cliente');
        }

        currentUser.update({
            name: userData.name,
            phone: userData.phone,
            image: userData.image,
            address: userData.address
        });

        const updatedUser = await updateUserRepository(currentUser);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}; 