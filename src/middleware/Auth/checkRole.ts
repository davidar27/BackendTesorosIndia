import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@/helpers/Tokens/verifyAccessToken';
import { UserRole } from '@/models/Auth/Auth';

export const checkRole = (allowedRoles: UserRole | UserRole[]) => {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.access_token;
            
            if (!token) {
                return res.status(401).json({
                    error: {
                        type: "authentication",
                        message: "Token no proporcionado"
                    }
                });
            }

            const userData = verifyAccessToken(token);

            if (!userData.data?.role) {
                return res.status(403).json({
                    error: {
                        type: "authorization",
                        message: "Rol no encontrado en el token"
                    }
                });
            }

            if (!roles.includes(userData.data.role)) {
                return res.status(403).json({
                    error: {
                        type: "authorization",
                        message: "No tienes permiso para acceder a este recurso"
                    }
                });
            }

            next();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).json({
                    error: {
                        type: "authentication",
                        message: error.message
                    }
                });
            }
            return res.status(500).json({
                error: {
                    type: "server",
                    message: "Error al verificar el rol"
                }
            });
        }
    };
};
