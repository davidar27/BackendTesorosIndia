import { Request, Response } from 'express';
import { findByEmailUserService } from '../../services/User/findByEmailUserService';
import { User } from '../../models/User/User';
import { registerEntrepreneurService } from '../../services/User/registerEntrepreneurService';


export const createEntrepreneurController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone_number, description, name_farm } = req.body;
        const role = "emprendedor"; 
        const existingUser = await findByEmailUserService(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }
        const newUser = new User(name, email, password, phone_number, true, role);
        const newFarm = { name: name_farm };

        await registerEntrepreneurService(newUser, newFarm);

        return res.status(201).json({ message: 'El registro del emprendedor ha sido exitoso' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el emprendedor' });
    }
};
