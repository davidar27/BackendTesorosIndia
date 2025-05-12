import { generateToken } from './generateToken';
import { REFRESH_TOKEN_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const generateRefreshToken = (userId: number, role: UserRole): string => {
    return generateToken({ userId, role }, REFRESH_TOKEN_SECRET, '7d');
};
