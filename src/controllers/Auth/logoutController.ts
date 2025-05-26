import { Request, Response } from 'express';

export const logoutController = async (req: Request, res: Response) => {

    try {
        res.clearCookie('access_token', { httpOnly: true, sameSite: 'none', secure: true });
        res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'none', secure: true });

        return res.status(200).json({
            success: true,
            message: 'Sesión cerrada exitosamente.'
        });

    } catch (error) {
        console.error('Error en logoutController:', error);
        return res.status(500).json({
            error: 'Error al cerrar sesión'
        });
    }
};
