import { generateToken } from './generateToken';
import { REFRESH_TOKEN_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const generateRefreshToken = (userId: number, name: string, role: UserRole, tokenVersion: number): string => {
    return generateToken({ userId, name, role, token_version: tokenVersion }, REFRESH_TOKEN_SECRET, '7d');
};
