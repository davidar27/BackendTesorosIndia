import { generateToken } from './generateToken';
import { ACCESS_TOKEN_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const generateAccessToken = (userId: number, name: string, role: UserRole, token_version: number): string => {
    return generateToken({ userId, name, role, token_version }, ACCESS_TOKEN_SECRET, '1h');
};
