import { Request, Response } from 'express';
import { deleteUnverifiedUsersService } from '@/services/User/deleteUnverifiedUsersService';

export const deleteUnverifiedUsersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedCount = await deleteUnverifiedUsersService();
        
        res.status(200).json({
            message: `${deletedCount} usuarios no verificados eliminados exitosamente`
        });
    } catch (error: any) {
        console.error('Error en deleteUnverifiedUsersController:', error);
        res.status(500).json({ 
            error: error.message || 'Error al eliminar usuarios no verificados' 
        });
    }
};
