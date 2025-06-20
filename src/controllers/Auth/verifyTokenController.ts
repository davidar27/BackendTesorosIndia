import { Request, Response } from 'express';
import { verifyTokenPayload } from '@/helpers/Tokens/verifyTokenPayload';
import { ACCESS_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { findByIdUserService } from '@/services/User/findByIdUserService';

export const verifyTokenController = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Token no proporcionado'
            });
        }

        const payload = verifyTokenPayload(token, ACCESS_TOKEN_SECRET);
        
        const user = await findByIdUserService(payload.data.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }

        return res.json({
            success: true,
            user: {
                userId: user.userId,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
                experience_id: user.experience_id,
                verified: user.verified,
                status: user.status
            },
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