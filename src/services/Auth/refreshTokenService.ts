import { generateAccessToken } from "../../helpers/Tokens/generateAccessToken";
import { generateRefreshToken } from "../../helpers/Tokens/generateRefreshToken";
import { findByIdUserService } from "../User/findByIdUserService";
import { verifyRefreshToken } from "../../helpers/Tokens/verifyRefreshToken";
import { UserRole } from "../../models/Auth/Auth";

export const refreshTokenService = async (refreshToken: string) => {
    const { userId } = await verifyRefreshToken(refreshToken);

    const user = await findByIdUserService(userId);

    if (!user) {
        return {
            accessToken: null,
            refreshToken: null,
            user: null 
        };
    }
    const newAccessToken = generateAccessToken(Number(userId), user.name, user.role as UserRole);
    const newRefreshToken = generateRefreshToken(Number(userId), user.name, user.role as UserRole);
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: await findByIdUserService(userId)
    }
};