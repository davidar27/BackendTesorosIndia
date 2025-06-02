import { User } from '@/models/User/User';
import { findByEmailUserService } from '../../User/findByEmailUserService';
import bcrypt from 'bcryptjs';
import createEntrepreneurRepository from '@/repositories/Dashboard/entreprenaur/createEntrepreneurRepository';
import { findEntrepreneurByIdRepository } from '@/repositories/Dashboard/entreprenaur/findEntrepreneurByIdRepository';


interface CreateEntrepreneurData {
    name: string;
    email: string;
    password: string;
    phone: string;
    name_farm: string;
}

export const createEntrepreneurService = async (entrepreneurData: CreateEntrepreneurData): Promise<User> => {
    try {
        const existingUser = await findByEmailUserService(entrepreneurData.email);
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(entrepreneurData.password, salt);

        const userToCreate = User.createEntrepreneur({
            name: entrepreneurData.name,
            email: entrepreneurData.email,
            password: hashedPassword,
            phone: entrepreneurData.phone,
            name_farm: entrepreneurData.name_farm,
        });

        const { emprendedorId } = await createEntrepreneurRepository(userToCreate);
        const createdUser = await findEntrepreneurByIdRepository(emprendedorId);
        
        if (!createdUser) {
            throw new Error('Error al crear el emprendedor');
        }
        
        return createdUser;
    } catch (error) {
        throw error;
    }
}; 