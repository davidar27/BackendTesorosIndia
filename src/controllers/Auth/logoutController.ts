import { Request, Response } from 'express';
import { cookieOptionsLogout } from '@/config/cookie';

export const logoutController = async (req: Request, res: Response) => {

    try {
        res.clearCookie('access_token', cookieOptionsLogout);
        res.clearCookie('refresh_token', cookieOptionsLogout);

        return res.status(200).json({
            success: true,
            message: 'Sesión cerrada exitosamente.'
        });

    } catch (error) {
        return res.status(500).json({
            error: 'Error al cerrar sesión'
        });
    }
};
