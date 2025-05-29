import { verifyTokenPayload } from './verifyTokenPayload';
import { VERIFICATION_TOKEN_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const verifyEmailVerificationToken = (
    token: string
    
): { userId: number } => {
    const payload = verifyTokenPayload<{ userId: number; role: UserRole; purpose: string; token_version: number }>(
        token,
        VERIFICATION_TOKEN_SECRET
    );

    if (payload.token_version !== 1) {
        throw new Error('Token de verificación inválido');
    }

    return { userId: payload.userId };
};

