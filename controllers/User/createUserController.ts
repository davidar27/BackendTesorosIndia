import { Request, Response } from 'express';
import { registerUserService } from '../../services/User/registerUserService';
import { findByEmailUserService } from '../../services/User/findByEmailUserService';
import { User } from '../../models/User/User';

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password, phone_number, role } = req.body;
        const existingUser = await findByEmailUserService(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }
        const userRegister = await registerUserService(new User(first_name, last_name, email, password, phone_number, role))
        return res.status(201).json({ message: 'Tu registro ha sido exitoso' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

