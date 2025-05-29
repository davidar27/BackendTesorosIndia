// src/auth/tokenUtils.ts
import jwt from 'jsonwebtoken';
import AuthError from '../../models/AuthError';
import { findByIdUserService } from '../../services/User/findByIdUserService';
import { REFRESH_TOKEN_SECRET } from './TokenSecrets';
import { TokenPayload } from '../../models/Auth/Auth';

export const verifyRefreshToken = async (token: string): Promise<{ userId: number; token_version: number }> => {
    if (!token) {
        throw new Error('Token de refresco no proporcionado');
    }

    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;

        if (!decoded.userId) {
            throw new AuthError('Token malformado: falta userId', {
                status: 401,
                errorType: 'authentication'
            });
        }

        const user = await findByIdUserService(decoded.userId.toString());
        if (!user) {
            throw new AuthError('Usuario no encontrado', {
                status: 404,
                errorType: 'authorization'
            });
        }

        return {
            userId: decoded.userId,
            token_version: decoded.token_version
        };
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