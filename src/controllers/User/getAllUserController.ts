import { Request, Response } from 'express';
import { gettAllUsersServices } from '../../services/User/gettAllUsersServices';



export const getAllUserController = async (req: Request, res: Response) => {
    try {
        const users = await gettAllUsersServices();
        res.json({ message: 'Lista de usuarios', users });
    } catch (error) {
        res.status(500).json({ error: 'Error al listar usuarios' });
    }
}


