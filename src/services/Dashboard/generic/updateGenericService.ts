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
        console.log('UpdateGenericService - Input data:', data);
        
        const currentEntity = await findByIdGenericService(data.userId, data.entityType);
        if (!currentEntity) {
            throw new Error('Entidad no encontrada');
        }
        console.log('Current entity:', currentEntity);

        const { userId, entityType, ...updateData } = data;
        console.log('Update data:', updateData);

        const changedFields: Record<string, any> = {};
        
        Object.entries(updateData).forEach(([key, value]) => {
            if (value !== undefined && value !== currentEntity[key]) {
                changedFields[key] = value;
            }
        });

        console.log('Changed fields:', changedFields);

        if (Object.keys(changedFields).length === 0) {
            throw new Error('No hay cambios para actualizar');
        }

        Object.assign(currentEntity, changedFields);
        console.log('Updated entity:', currentEntity);

        await updateGenericRepository(currentEntity, changedFields, entityType);
        
        return changedFields;
    } catch (error) {
        console.error('Error in updateGenericService:', error);
        throw error;
    }
}; 