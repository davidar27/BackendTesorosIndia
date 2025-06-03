import { verifyTokenPayload } from '@/helpers/Tokens/verifyTokenPayload';
import { REFRESH_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { TokenPayload } from '@/models/Auth/Auth';
import { findByIdUserService } from '@/services/User/findByIdUserService';
import AuthError from '@/models/AuthError';

export const verifyRefreshToken = async (token: string): Promise<{ userId: number, token_version: number }> => {
    if (!token) {
        throw new AuthError('Token de refresco no proporcionado', {
            status: 401,
            errorType: 'authentication'
        });
    }


    const data = verifyTokenPayload<TokenPayload>(token, REFRESH_TOKEN_SECRET, {
        redirectOnExpire: '/auth/iniciar-sesion'
    });
    const user = await findByIdUserService(data.data.userId);
    console.log(user);
    if (!user) {
        throw new AuthError('Usuario no encontrado', {
            status: 404,
            errorType: 'authorization'
        });
    }

    return {
        userId: data.data.userId,
        token_version: user.token_version
    };
};