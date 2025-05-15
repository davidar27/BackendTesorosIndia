import { verifyTokenPayload } from './verifyTokenPayload';
import { ACCESS_TOKEN_SECRET } from './TokenSecrets';
import { TokenPayload } from '../../models/Auth/Auth';

export const verifyAccessToken = (token: string): TokenPayload => {
    return verifyTokenPayload(token, ACCESS_TOKEN_SECRET);
};
