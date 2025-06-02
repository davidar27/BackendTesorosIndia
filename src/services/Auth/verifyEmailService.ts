import { verifyEmailRepository } from '@/repositories/Auth/verifyEmailRepository';

export const verifyEmailService = async (userId: number): Promise<void> => {
    try {
        await verifyEmailRepository(userId);
    } catch (error) {
        throw new Error('Token de verificación inválido o expirado');
    }
};
