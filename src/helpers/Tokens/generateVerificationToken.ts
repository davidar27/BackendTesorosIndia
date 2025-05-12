import { UserRole } from '../../models/Auth/Auth';
import { generateToken } from './generateToken';
import { VERIFICATION_TOKEN_SECRET } from './TokenSecrets';

export const generateVerificationToken = (userId: number, role: UserRole): string => {
    return generateToken(
        { userId, role, purpose: 'email_verification' },
        VERIFICATION_TOKEN_SECRET,
        '24h'
    );
    
};
