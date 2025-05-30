import { generateToken } from './generateToken';
import { ACCESS_TOKEN_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const generateAccessToken = (userId: number, name: string, role: UserRole, token_version: number): string => {
    return generateToken({ data: { userId, name, role }, jti: '', token_version: 0, iat: 0, exp: 0 }, ACCESS_TOKEN_SECRET, '1h');
};
