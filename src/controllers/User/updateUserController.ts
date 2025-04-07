import { Request, Response } from 'express';
import { udpateUserService } from '../../services/User/udpateUserService';



export const updateUserController = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const updateData = req.body;

        const updatedUser = await udpateUserService(Number(user_id), updateData);

        if (updatedUser === null) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

