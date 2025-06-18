import { User } from '@/models/User/User';
import { findByEmailUserService } from './findByEmailUserService';
import bcrypt from 'bcryptjs';
import { createUserRepository } from '@/repositories/User/createUserRepository';

interface CreateClientData {
    name: string;
    email: string;
    password: string;
    phone: string;
    address?: string;
}

export const createClientService = async (clientData: CreateClientData): Promise<User> => {
    try {
        const existingUser = await findByEmailUserService(clientData.email);
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(clientData.password, salt);

        const userToCreate = User.createClient({
            name: clientData.name,
            email: clientData.email,
            password: hashedPassword,
            phone: clientData.phone,
            address: clientData.address
        });

        const createdUser = await createUserRepository(userToCreate);
        return createdUser;
    } catch (error) {
        throw error;
    }
}; 