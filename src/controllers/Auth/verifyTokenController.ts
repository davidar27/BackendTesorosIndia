import { Request, Response } from 'express';
import { verifyToken } from '../../helpers/Tokens/verifyToken';
import { ACCESS_TOKEN_SECRET } from '../../helpers/Tokens/TokenSecrets';

export const verifyTokenController = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Token no proporcionado'
            });
        }

        const payload = verifyToken(token, ACCESS_TOKEN_SECRET);

        return res.json({
            success: true,
            user: payload,
            code: 'VALITED_TOKEN'
        });

    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('expirado')) {
                return res.status(401).json({
                    success: false,
                    error: 'Token expirado',
                    code: 'TOKEN_EXPIRED'
                });
            }
            if (error.message.includes('inválido')) {
                return res.status(401).json({
                    success: false,
                    error: 'Token inválido',
                    code: 'INVALID_TOKEN'
                });
            }
        }

        return res.status(500).json({
            success: false,
            error: 'Error al verificar el token'
        });
    }
};