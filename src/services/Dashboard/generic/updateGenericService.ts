import { User } from '@/models/User/User';
import { findByIdGenericService } from './findByIdGenericService';
import { updateGenericRepository } from '@/repositories/Dashboard/generic/updateGenericRepository';

interface UpdateGenericData {
    userId: number;
    entityType: string;
    [key: string]: any;
}

export const updateGenericService = async (data: UpdateGenericData): Promise<Record<string, any>> => {
    try {
        const currentEntity = await findByIdGenericService(data.userId, data.entityType);
        if (!currentEntity) {
            throw new Error('Entidad no encontrada');
        }

        // Remove userId and entityType from the data to compare
        const { userId, entityType, ...updateData } = data;

        const changedFields: Record<string, any> = {};
        
        // Compare each field and only include changed ones
        Object.entries(updateData).forEach(([key, value]) => {
            if (value !== undefined && value !== currentEntity[key]) {
                changedFields[key] = value;
            }
        });

        if (Object.keys(changedFields).length === 0) {
            throw new Error('No hay cambios para actualizar 2222');
        }

        // Update the entity instance
        Object.assign(currentEntity, changedFields);

        // Call the generic repository to persist changes
        await updateGenericRepository(currentEntity, changedFields, entityType);
        
        return changedFields;
    } catch (error) {
        throw error;
    }
}; 