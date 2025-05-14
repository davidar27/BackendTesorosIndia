import { generateToken } from './generateToken';
import { ACCESS_TOKEN_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const generateAccessToken = (userId: number, name: string, role: UserRole): string => {
    return generateToken({ userId, name, role }, ACCESS_TOKEN_SECRET, '15m');
};
