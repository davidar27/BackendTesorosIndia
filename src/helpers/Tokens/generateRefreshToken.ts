import { generateToken } from '@/helpers/Tokens/generateToken';
import { REFRESH_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { UserRole } from '@/models/Auth/Auth';
import { createTokenPayload, TOKEN_EXPIRATION } from '@/helpers/Tokens/TokenTypes';

export const generateRefreshToken = (userId: number, name: string, role: UserRole, tokenVersion: number, experience_id: number | undefined, image?: string, address?: string,): string => {
    if (!userId || !role || tokenVersion === undefined) {
        throw new Error('userId, role y tokenVersion son requeridos para generar el token de refresco');
    }
    const payload = createTokenPayload({ userId, name, role, experience_id, image, address }, tokenVersion);
    return generateToken(payload, REFRESH_TOKEN_SECRET, TOKEN_EXPIRATION.REFRESH);
};
