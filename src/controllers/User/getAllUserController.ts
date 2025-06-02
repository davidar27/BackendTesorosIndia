import { Request, Response } from 'express';
import { getAllUserService } from '@/services/User/getAllUserService';

export const getAllUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAllUserService();
        
        res.status(200).json({
            message: 'Usuarios recuperados exitosamente',
            users
        });
    } catch (error: any) {
        console.error('Error en getAllUserController:', error);
        res.status(500).json({ 
            error: error.message || 'Error al recuperar los usuarios' 
        });
    }
};


