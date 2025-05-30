import { verifyTokenPayload } from './verifyTokenPayload';
import { VERIFICATION_TOKEN_SECRET } from './TokenSecrets';
import { TokenPayload } from '../../models/Auth/Auth';

export const verifyEmailVerificationToken = (
    token: string
    
): { userId: number } => {
    const payload = verifyTokenPayload<TokenPayload>(
        token,
        VERIFICATION_TOKEN_SECRET
    );

    if (payload.token_version !== 1) {
        throw new Error('Token de verificación inválido');
    }

    return { userId: payload.data.userId };
};

