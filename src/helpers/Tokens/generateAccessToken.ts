import { generateToken } from './generateToken';
import { ACCESS_TOKEN_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const generateAccessToken = (userId: number, role: UserRole): string => {
    return generateToken({ userId, role }, ACCESS_TOKEN_SECRET, '15m');
};
