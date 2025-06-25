import { User } from '@/models/User/User';
import { updateUserRepository } from '@/repositories/User/updateUserRepository';
import { findByIdGenericService } from '@/services/Dashboard/generic/findByIdGenericService';

interface UpdateClientData {
    userId: number;
    name?: string;
    phone?: string;
    image?: string;
    address?: string;
}

export const updateClientService = async (userData: UpdateClientData): Promise<User> => {
    try {
        const currentUserData = await findByIdGenericService(userData.userId, 'cliente');
        if (!currentUserData) {
            throw new Error('Usuario no encontrado');
        }

        const currentUser = new User({
            userId: currentUserData.usuario_id,
            name: userData.name ?? currentUserData.nombre,
            email: currentUserData.correo,
            password: currentUserData.contraseña ?? '', // or handle as needed
            phone: userData.phone ?? currentUserData.telefono,
            role: currentUserData.rol,
            verified: Boolean(currentUserData.verificado),
            image: userData.image ?? currentUserData.imagen,
            address: userData.address ?? currentUserData.direccion,
            token_version: currentUserData.token_version ?? 0,
        });

        const updatedUser = await updateUserRepository(currentUser);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}; 