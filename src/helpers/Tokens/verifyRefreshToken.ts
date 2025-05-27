// src/auth/tokenUtils.ts
import jwt from 'jsonwebtoken';
import AuthError from '../../models/AuthError';
import { findByIdUserService } from '../../services/User/findByIdUserService';

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

interface RefreshTokenPayload {
    userId: string;
    jti?: string;
    iat: number;
    exp: number;
}

export const verifyRefreshToken = async (token: string): Promise<{ userId: string }> => {
    if (!token) {
        throw new Error('Token de refresco no proporcionado');
    }

    try {
        // 1. Verificar firma y expiración del JWT
        const payload = jwt.verify(token, JWT_REFRESH_SECRET) as RefreshTokenPayload;

        // 2. Validar estructura del payload
        if (!payload.userId) {
            throw new AuthError('Token malformado: falta userId', {
                status: 401,
                errorType: 'authentication'
            });

        }

        // 3. (Opcional) Validar si el usuario existe
        const user = await findByIdUserService(payload.userId);
        if (!user) {
            throw new AuthError('Usuario no encontrado', {
                status: 404,
                errorType: 'authorization'
            });
        }

        return { userId: payload.userId };

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new AuthError('Token de refresco expirado', {
                status: 401,
                errorType: 'authentication',
                redirectTo: '/auth/login'
            });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            throw new AuthError('Token de refresco inválido', {
                status: 401,
                errorType: 'authentication'
            });
        }

        throw error; 
    }
};