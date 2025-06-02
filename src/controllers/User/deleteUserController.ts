import { Request, Response } from 'express';
import { deleteUserService } from '@/services/User/deleteUserService';

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
        
        if (isNaN(userId)) {
            res.status(400).json({ error: 'ID de usuario inválido' });
            return;
        }

        await deleteUserService(userId);
        
        res.status(200).json({
            message: 'Usuario eliminado exitosamente'
        });
    } catch (error: any) {
        console.error('Error en deleteUserController:', error);
        res.status(500).json({ 
            error: error.message || 'Error al eliminar el usuario' 
        });
    }
};
