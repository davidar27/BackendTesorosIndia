import { Request, Response } from 'express';
import { User } from '@/models/User/User';
import { createClientService } from '@/services/User/createClientService';

export const createUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            res.status(400).json({ 
                error: 'Faltan campos requeridos (nombre, email, contraseña, teléfono)' 
            });
            return;
        }

        const userData = User.createClient({
            name,
            email,
            password,
            phone
        });

        const newUser = await createClientService(userData);
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: newUser
        });
    } catch (error: any) {
        console.error('Error en createUserController:', error);
        res.status(500).json({ 
            error: error.message || 'Error al crear el usuario' 
        });
    }
}; 