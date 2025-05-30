import { UserRole } from '../../models/Auth/Auth';
import { generateToken } from './generateToken';
import { VERIFICATION_TOKEN_SECRET } from './TokenSecrets';

export const generateVerificationToken = (userId: number, role: UserRole): string => {
    return generateToken(
        { data: { userId, role }, purpose: 'email_verification', token_version: 1, jti: '', iat: 0, exp: 0 },
        VERIFICATION_TOKEN_SECRET,
        '24h'
    );
    
};
