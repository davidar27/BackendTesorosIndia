import { generateToken } from './generateToken';
import { REFRESH_TOKEN_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const generateRefreshToken = (userId: number, name: string, role: UserRole, tokenVersion: number): string => {
    return generateToken({ data: { userId, name, role }, jti: '', token_version: tokenVersion, iat: 0, exp: 0 }, REFRESH_TOKEN_SECRET, '7d');
};
