import { Request, Response } from 'express';
import { createUserService } from '@/services/User/createUserService';
import { User } from '@/models/User/User';

export const createEntrepreneurController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phone, description } = req.body;

        if (!name || !email || !password || !phone) {
            res.status(400).json({ 
                error: 'Faltan campos requeridos (nombre, email, contraseña, teléfono)' 
            });
            return;
        }

        const userData = User.createEntrepreneur({
            name,
            email,
            password,
            phone,
            description: description?.trim() || undefined
        });

        const newUser = await createUserService(userData);
        res.status(201).json({
            message: 'Emprendedor creado exitosamente',
            user: newUser
        });
    } catch (error: any) {
        console.error('Error en createEntrepreneurController:', error);
        res.status(500).json({ 
            error: error.message || 'Error al crear el emprendedor' 
        });
    }
};
