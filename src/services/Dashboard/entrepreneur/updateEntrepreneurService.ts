import { User, EntrepreneurProps } from '@/models/User/User';
import { findByIdUserService } from '../../User/findByIdUserService';
import { updateEntrepreneurRepository } from '@/repositories/Dashboard/entreprenaur/updateEntrepreneurRepository';

interface UpdateEntrepreneurData {
    userId: number;
    name?: string;
    phone?: string;
    image?: string;
    description?: string;
    name_farm?: string;
}

export const updateEntrepreneurService = async (userData: UpdateEntrepreneurData): Promise<User> => {
    try {
        const currentUser = await findByIdUserService(userData.userId);
        if (!currentUser) {
            throw new Error('Usuario no encontrado');
        }

        if (currentUser.role !== 'emprendedor') {
            throw new Error('El usuario no es un emprendedor');
        }

        console.log('Update Data:', userData);
        console.log('Current User:', currentUser);

        const updateProps: Partial<EntrepreneurProps> = {};
        if (userData.name) updateProps.name = userData.name;
        if (userData.phone) updateProps.phone = userData.phone;
        if (userData.image !== undefined) {
            updateProps.image = userData.image ? `/images/${userData.image}` : '';
        }
        if (userData.description !== undefined) updateProps.description = userData.description;
        if (userData.name_farm) updateProps.name_farm = userData.name_farm;

        console.log('Update Props:', updateProps);

        currentUser.update(updateProps);

        const updatedUser = await updateEntrepreneurRepository(currentUser);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}; 