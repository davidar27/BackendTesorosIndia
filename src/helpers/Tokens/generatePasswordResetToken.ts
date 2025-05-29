import { generateToken } from './generateToken';
import { PASSWORD_RESET_SECRET } from './TokenSecrets';

export const generatePasswordResetToken = ( userId: number,email: string
): string => {
    return generateToken(
        {
            userId, email, purpose: 'password_reset',
            token_version: 0
        },
        PASSWORD_RESET_SECRET,
        '1h'
    );
};
