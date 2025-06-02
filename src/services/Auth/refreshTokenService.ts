import { generateAccessToken } from "@/helpers/Tokens/generateAccessToken";
import { generateRefreshToken } from "@/helpers/Tokens/generateRefreshToken";
import { findByIdUserService } from "@/services/User/findByIdUserService";
import { verifyRefreshToken } from "@/helpers/Tokens/verifyRefreshToken";
import { UserRole } from "@/models/Auth/Auth";
import AuthError from "@/models/AuthError";

export const refreshTokenService = async (refreshToken: string) => {
    const { userId, token_version: tokenVersion } = await verifyRefreshToken(refreshToken);

    const user = await findByIdUserService(userId);

    if (!user) {
        throw new AuthError("Usuario no encontrado", {
            status: 404,
            errorType: 'authentication'
        });
    }

    if (!user.role) {
        throw new AuthError("Rol de usuario no encontrado", {
            status: 401,
            errorType: 'authentication'
        });
    }

    if (user.token_version !== tokenVersion) {
        throw new AuthError("Token inválido - versión no coincide", {
            status: 401,
            errorType: 'authentication'
        });
    }

    const newAccessToken = generateAccessToken(Number(userId), user.name, user.role as UserRole, user.token_version);
    const newRefreshToken = generateRefreshToken(Number(userId), user.name, user.role as UserRole, user.token_version);
    
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user
    }
};