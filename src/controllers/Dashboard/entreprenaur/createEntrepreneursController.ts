import { Request, Response } from 'express';
import { User } from '@/models/User/User';
import { createEntrepreneurService } from '@/services/Dashboard/entrepreneur/createEntrepreneurService';

export const createEntrepreneursController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phone, name_farm } = req.body;

        if (!name || !email || !password || !phone || !name_farm) {
            res.status(400).json({ 
                error: 'Faltan campos requeridos (nombre, email, contraseña, teléfono, nombre de granja)' 
            });
            return;
        }

        const userData = User.createEntrepreneur({
            name,
            email,
            password,
            phone,
            name_farm
        });

        const entrepreneurData = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            name_farm,
        };

        const newUser = await createEntrepreneurService(entrepreneurData);
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
