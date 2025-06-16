import { createGenericRepository } from '@/repositories/Dashboard/generic/createGenericRepository';

interface CreateGenericData {
    entityType: string;
    [key: string]: any;
}

export const createGenericService = async (data: CreateGenericData): Promise<Record<string, any>> => {
    try {
        // Validar que se proporcionen los datos necesarios
        if (!data.entityType) {
            throw new Error('Tipo de entidad no especificado');
        }

        // Crear la entidad usando el repositorio genérico
        const createdEntity = await createGenericRepository(data);
        
        return createdEntity;
    } catch (error) {
        throw error;
    }
}; 