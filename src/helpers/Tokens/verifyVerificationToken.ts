import { verifyTokenPayload } from './verifyTokenPayload';
import { VERIFICATION_TOKEN_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const verifyEmailVerificationToken = (
    token: string
    
): { userId: number } => {
    const payload = verifyTokenPayload<{ userId: number; role: UserRole; purpose: string }>(
        token,
        VERIFICATION_TOKEN_SECRET
    );

    return { userId: payload.userId };
};

