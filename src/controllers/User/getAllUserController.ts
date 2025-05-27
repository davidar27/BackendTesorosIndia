import { Request, Response } from 'express';
import { gettAllUsersServices } from '../../services/User/gettAllUsersServices';



export const getAllUserController = async (req: Request, res: Response) => {
    try {
        const entrepreneurs  = await gettAllUsersServices();
        return res.status(200).json({
            status: 'success',
            entrepreneurs : entrepreneurs 
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al listar emprendedores'
        });
    }
}


