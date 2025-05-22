// src/auth/tokenUtils.ts
import jwt from 'jsonwebtoken';
import { AuthError } from '../errors';
import { User } from '../../models/User/User';

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

interface RefreshTokenPayload {
    userId: string;
    jti?: string; // Optional: ID único del token (para revocación sin BD)
    iat: number;
    exp: number;
}

export const verifyRefreshToken = async (token: string): Promise<{ userId: string }> => {
    if (!token) {
        throw new AuthError('Token de refresco no proporcionado', {
            status: 401,
            errorType: 'authentication'
        });
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
        const user = await User.findById(payload.userId);
        if (!user) {
            throw new AuthError('Usuario no encontrado', {
                status: 404,
                errorType: 'authorization'
            });
        }

        // 4. (Opcional) Revocación por fecha - Ejemplo: Invalidar tokens emitidos antes de X fecha
        const tokenIssuedAt = new Date(payload.iat * 1000);
        const lastPasswordChange = user.lastPasswordChange || user.createdAt;

        if (tokenIssuedAt < lastPasswordChange) {
            throw new AuthError('Token revocado (cambio de contraseña)', {
                status: 401,
                errorType: 'authentication'
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