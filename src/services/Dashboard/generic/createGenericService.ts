import { createGenericRepository } from '@/repositories/Dashboard/generic/createGenericRepository';
import bcrypt from 'bcryptjs';

interface CreateGenericData {
    entityType: string;
    [key: string]: any;
}

export const createGenericService = async (data: CreateGenericData): Promise<Record<string, any>> => {
    try {
        if (!data.entityType) {
            throw new Error('Tipo de entidad no especificado');
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;
        const entity = await createGenericRepository(data);

        return entity;
    } catch (error) {
        throw error;
    }
}; 