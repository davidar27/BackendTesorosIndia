import { Request, Response } from 'express';

export const logoutController = async (req: Request, res: Response) => {
    const isProduction = process.env.NODE_ENV === "production";

    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            domain: isProduction ? new URL(process.env.FRONTEND_URL || "").hostname : undefined,
            path: "/",
        });

        // res.clearCookie('refresh_token', {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'strict',
        //     path: '/'
        // });

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
