import { generateToken } from '@/helpers/Tokens/generateToken';
import { ACCESS_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { UserRole } from '@/models/Auth/Auth';
import { createTokenPayload, TOKEN_EXPIRATION } from '@/helpers/Tokens/TokenTypes';

export const generateAccessToken = (userId: number, name: string, role: UserRole, token_version: number, experience_id: number | undefined, image?: string, address?: string,): string => {
    if (!userId || !role || token_version === undefined) {
        throw new Error('userId, role y token_version son requeridos para generar el token de acceso');
    }
    const payload = createTokenPayload({ userId, name, address, role, experience_id, image }, token_version);
    return generateToken(payload, ACCESS_TOKEN_SECRET, TOKEN_EXPIRATION.ACCESS);
};
