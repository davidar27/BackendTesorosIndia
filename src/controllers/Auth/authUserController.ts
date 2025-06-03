import { Request, Response } from "express";
import UserAuth from "@/models/Auth/userAuth";
import { authUserService } from "@/services/Auth/authUserService";
import { generateAccessToken } from "@/helpers/Tokens/generateAccessToken";
import { generateRefreshToken } from "@/helpers/Tokens/generateRefreshToken";
import { UserRole } from "@/models/Auth/Auth";
import { cookieOptionsLogin, cookieOptionsRefresh } from "@/config/cookie";

export const authUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Request headers:', req.headers);
        
        const { email, password } = req.body;
        console.log('Login attempt for email:', email);

        if (!email || !password) {
            return res.status(400).json({
                error: {
                    type: "general",
                    message: "Email y contraseña son requeridos"
                }
            });
        }

        const login = await authUserService(new UserAuth(email, password));
        console.log('Login successful for user:', login.name);

        const { userId, role, name, token_version, status } = login;

        const validRoles: UserRole[] = ["cliente", "administrador", "emprendedor"];
        if (!validRoles.includes(role as UserRole)) {
            return res.status(401).json({
                error: {
                    type: "general",
                    message: "Rol de usuario no válido"
                }
            });
        }

        const accessToken = generateAccessToken(userId!, name!, role as UserRole, token_version!);
        const refreshToken = generateRefreshToken(userId!, name!, role as UserRole, token_version!);

        console.log('Cookie options login:', cookieOptionsLogin);
        console.log('Cookie options refresh:', cookieOptionsRefresh);

        res.cookie('access_token', accessToken, cookieOptionsLogin);
        res.cookie('refresh_token', refreshToken, cookieOptionsRefresh);

        console.log('Cookies set successfully');
        console.log('Response headers:', res.getHeaders());

        return res.status(200).json({
            status,
            user: { userId, name, role, token_version },
        });

    } catch (error: any) {
        console.error('Authentication error:', error);
        console.error('Stack trace:', error.stack);
        
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