import { verifyToken } from './verifyToken';
import { ACCESS_TOKEN_SECRET } from './TokenSecrets';
import { TokenPayload } from '../../models/Auth/Auth';

export const verifyAccessToken = (token: string): TokenPayload => {
    return verifyToken(token, ACCESS_TOKEN_SECRET);
};
