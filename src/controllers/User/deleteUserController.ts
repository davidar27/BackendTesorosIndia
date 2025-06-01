import { Request, Response } from 'express';
import { deleteUserService } from '@/services/User/deleteUserService';

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const user = await deleteUserService(Number(id));
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await deleteUserService(Number(id));

        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al intentar borrar el usuario:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
