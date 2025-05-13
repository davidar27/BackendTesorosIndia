import { Request, Response } from 'express';

export const logoutController = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Sesión cerrada exitosamente. Por favor elimina el token del cliente.'
        });

    } catch (error) {
        console.error('Error en logoutController:', error);
        return res.status(500).json({
            error: 'Error al cerrar sesión'
        });
    }
};