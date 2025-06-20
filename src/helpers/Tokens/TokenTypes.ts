import { TokenData } from '@/models/Auth/Auth';
import crypto from 'crypto';
import { TokenPayload } from '@/models/Auth/Auth';

export const TOKEN_EXPIRATION = {
    ACCESS: '5m',
    REFRESH: '7d',
    VERIFICATION: '24h',
    PASSWORD_RESET: '1h'
} as const;

export const createTokenPayload = (data: TokenData, token_version: number, purpose?: string): TokenPayload => {
    if (!data.userId) {
        throw new Error('El campo userId es requerido');
    }

    // Solo validar role para tokens de acceso y refresco
    if (!purpose && !data.role) {
        throw new Error('El campo role es requerido para tokens de acceso y refresco');
    }
    
    if (token_version === undefined) {
        throw new Error('El campo token_version es requerido');
    }
    
    return {
        data,
        jti: crypto.randomUUID(),
        token_version,
        purpose
    };
}; 