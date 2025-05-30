import { generateToken } from './generateToken';
import { PASSWORD_RESET_SECRET } from './TokenSecrets';

export const generatePasswordResetToken = (userId: number, email: string
): string => {
    return generateToken(
        {
            data: { userId, email },
            purpose: 'password_reset',
            jti: '',
            token_version: 0,
            iat: 0,
            exp: 0
        },
        PASSWORD_RESET_SECRET,
        '1h'
    );
};
