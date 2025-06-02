import { verifyTokenPayload } from '@/helpers/Tokens/verifyTokenPayload';
import { ACCESS_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { TokenPayload } from '@/models/Auth/Auth';

export const verifyAccessToken = (token: string) => {
    return verifyTokenPayload<TokenPayload>(token, ACCESS_TOKEN_SECRET);
};
