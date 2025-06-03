import { EntrepreneurProps } from '@/models/User/User';
import { findByIdUserService } from '../../User/findByIdUserService';
import { updateEntrepreneurRepository } from '@/repositories/Dashboard/entreprenaur/updateEntrepreneurRepository';

interface UpdateEntrepreneurData {
    userId: number;
    name?: string;
    email?: string;
    phone?: string;
    image?: string;
    description?: string;
    name_farm?: string;
}

export const updateEntrepreneurService = async (userData: UpdateEntrepreneurData): Promise<Record<string, any>> => {
    try {
        const currentUser = await findByIdUserService(userData.userId);
        if (!currentUser) {
            throw new Error('Usuario no encontrado');
        }

        if (currentUser.role !== 'emprendedor') {
            throw new Error('El usuario no es un emprendedor');
        }

        const changedFields: Partial<EntrepreneurProps> = {};
        if (userData.name && userData.name !== currentUser.name) changedFields.name = userData.name;
        if (userData.email && userData.email !== currentUser.email) changedFields.email = userData.email;
        if (userData.phone && userData.phone !== currentUser.phone) changedFields.phone = userData.phone;
        if (userData.image !== undefined && userData.image !== currentUser.image) changedFields.image = userData.image ? `/images/${userData.image}` : '';
        if (userData.description !== undefined && userData.description !== currentUser.description) changedFields.description = userData.description;
        if (userData.name_farm && userData.name_farm !== currentUser.name_farm) changedFields.name_farm = userData.name_farm;

        if (Object.keys(changedFields).length === 0) {
            throw new Error('No hay cambios para actualizar');
        }

        currentUser.update(changedFields);

        await updateEntrepreneurRepository(currentUser, changedFields);
        return changedFields;
    } catch (error) {
        throw error;
    }
}; 