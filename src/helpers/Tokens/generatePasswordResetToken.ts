import { generateToken } from '@/helpers/Tokens/generateToken';
import { PASSWORD_RESET_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { createTokenPayload, TOKEN_EXPIRATION } from '@/helpers/Tokens/TokenTypes';

export const generatePasswordResetToken = (userId: number, email: string): string => {
    const payload = createTokenPayload({ userId, email }, 0, 'password_reset');
    return generateToken(payload, PASSWORD_RESET_SECRET, TOKEN_EXPIRATION.PASSWORD_RESET);
};
