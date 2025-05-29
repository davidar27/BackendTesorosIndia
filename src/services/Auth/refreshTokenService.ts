import { generateAccessToken } from "../../helpers/Tokens/generateAccessToken";
import { generateRefreshToken } from "../../helpers/Tokens/generateRefreshToken";
import { findByIdUserService } from "../User/findByIdUserService";
import { verifyRefreshToken } from "../../helpers/Tokens/verifyRefreshToken";
import { UserRole } from "../../models/Auth/Auth";

export const refreshTokenService = async (refreshToken: string) => {
    const { userId, token_version: tokenVersion } = await verifyRefreshToken(refreshToken);

    const user = await findByIdUserService(userId.toString());

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    if (user.token_version !== tokenVersion) {
        throw new Error("Token inválido - versión no coincide");
    }

    const newAccessToken = generateAccessToken(Number(userId), user.name, user.role as UserRole, user.token_version);
    const newRefreshToken = generateRefreshToken(Number(userId), user.name, user.role as UserRole, user.token_version);
    
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user
    }
};