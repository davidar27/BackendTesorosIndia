import { UserRole } from '@/models/Auth/Auth';
import { generateToken } from '@/helpers/Tokens/generateToken';
import { VERIFICATION_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { createTokenPayload, TOKEN_EXPIRATION } from '@/helpers/Tokens/TokenTypes';

export const generateVerificationToken = (userId: number, role: UserRole): string => {
    const payload = createTokenPayload({ userId, role }, 1, 'email_verification');
    return generateToken(payload, VERIFICATION_TOKEN_SECRET, TOKEN_EXPIRATION.VERIFICATION);
};
