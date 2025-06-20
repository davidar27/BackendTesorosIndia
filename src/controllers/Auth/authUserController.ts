import { Request, Response } from "express";
import UserAuth from "@/models/Auth/userAuth";
import { authUserService } from "@/services/Auth/authUserService";
import { generateAccessToken } from "@/helpers/Tokens/generateAccessToken";
import { generateRefreshToken } from "@/helpers/Tokens/generateRefreshToken";
import { UserRole } from "@/models/Auth/Auth";
import { cookieOptionsLogin, cookieOptionsRefresh } from "@/config/cookie";

export const authUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: {
                    type: "general",
                    message: "Email y contraseña son requeridos"
                }
            });
        }

        const user = await authUserService(new UserAuth(email, password));
        

        const { userId, role, name, token_version, status, experience_id, image } = user;
        

        const validRoles: UserRole[] = ["cliente", "administrador", "emprendedor"];
        if (!validRoles.includes(role as UserRole)) {
            return res.status(401).json({
                error: {
                    type: "general",
                    message: "Rol de usuario no válido"
                }
            });
        }

        const accessToken = generateAccessToken(userId!, name!, role as UserRole, token_version!, experience_id, image);
        const refreshToken = generateRefreshToken(userId!, name!, role as UserRole, token_version!, experience_id, image);

        res.cookie('access_token', accessToken, cookieOptionsLogin);
        res.cookie('refresh_token', refreshToken, cookieOptionsRefresh);


        return res.status(200).json({
            status,
            user,
        });

    } catch (error: any) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');

        if (error.status === 401 || error.errorType) {
            return res.status(error.status || 401).json({
                error: {
                    type: error.errorType || "general",
                    message: error.message,
                    redirectTo: error.redirectTo
                }
            });
        }

        return res.status(500).json({
            error: {
                type: "general",
                message: "Error interno del servidor"
            }
        });
    }
};