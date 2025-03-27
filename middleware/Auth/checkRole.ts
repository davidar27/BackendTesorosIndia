import { Request, Response, NextFunction } from 'express';

export const checkRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.body.role === !role) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};