import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../../helpers/Tokens/verifyAccessToken';

export const checkRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.access_token;
            
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }

            const payload = verifyAccessToken(token);
            
            if (payload.data.role !== requiredRole) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            next();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Error al verificar el rol' });
        }
    };
};
