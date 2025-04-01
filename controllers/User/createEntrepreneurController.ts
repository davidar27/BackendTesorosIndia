import { Request, Response } from 'express';
import { findByEmailUserService } from '../../services/User/findByEmailUserService';
import { User } from '../../models/User/user';
import { registerEntrepreneurService } from '../../services/User/registerEntrepreneurService';

export const createEntrepreneurController = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password, phone_number, description } = req.body;
        const role = "emprendedor"; 
        const existingUser = await findByEmailUserService(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        await registerEntrepreneurService(new User(first_name, last_name, email, password, phone_number, role), description);

        return res.status(201).json({ message: 'El registro del emprendedor ha sido exitoso' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el emprendedor' });
    }
};
