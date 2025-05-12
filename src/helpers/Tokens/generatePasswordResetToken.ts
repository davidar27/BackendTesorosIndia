import { generateToken } from './generateToken';
import { PASSWORD_RESET_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const generatePasswordResetToken = (userId: number, role: UserRole): string => {
    return generateToken(
        { userId, role, purpose: 'password_reset' },
        PASSWORD_RESET_SECRET,
        '1h'
    );
};
