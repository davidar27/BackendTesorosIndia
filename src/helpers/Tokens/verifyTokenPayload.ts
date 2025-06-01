import jwt from 'jsonwebtoken';
import { TokenPayload } from '@/models/Auth/Auth';
import AuthError from '@/models/AuthError';

export interface VerifyOptions {
    requirePurpose?: string;
    requireTokenVersion?: number;
    redirectOnExpire?: string;
}

export const verifyTokenPayload = <T extends TokenPayload>(
    token: string, 
    secret: string,
    options: VerifyOptions = {}
): T => {
    if (!token || !secret) {
        throw new AuthError('Token y secreto son requeridos', {
            status: 401,
            errorType: 'authentication'
        });
    }

    try {
        const decoded = jwt.verify(token, secret) as T;
        
        if (!decoded.data) {
            throw new AuthError('Token malformado', {
                status: 401,
                errorType: 'authentication'
            });
        }

        if (options.requirePurpose && decoded.purpose !== options.requirePurpose) {
            throw new AuthError('Propósito del token inválido', {
                status: 401,
                errorType: 'authentication'
            });
        }

        if (options.requireTokenVersion !== undefined && decoded.token_version !== options.requireTokenVersion) {
            throw new AuthError('Versión del token inválida', {
                status: 401,
                errorType: 'authentication'
            });
        }

        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new AuthError('Token expirado', {
                status: 401,
                errorType: 'authentication',
                redirectTo: options.redirectOnExpire
            });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new AuthError('Token inválido', {
                status: 401,
                errorType: 'authentication'
            });
        }
        throw error;
    }
};