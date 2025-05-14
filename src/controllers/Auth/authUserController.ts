import { Request, Response } from "express";
import UserAuth from "../../models/Auth/userAuth";
import { authUserService } from "../../services/Auth/authUserService";
import { generateAccessToken } from "../../helpers/Tokens/generateAccessToken";
import { generateRefreshToken } from "../../helpers/Tokens/generateRefreshToken";
import { UserRole } from "../../models/Auth/Auth";
import { cookieOptionsLogin, cookieOptionsRefresh } from "../../config/cookie";


export const authUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: { type: "general", message: "Email y contraseña son requeridos" } });
        }

        const login = await authUserService(new UserAuth(email, password));

        const { id, role, name, status } = login;

        const validRoles: UserRole[] = ["cliente", "administrador", "emprendedor"];
        if (!validRoles.includes(role as UserRole)) {
            return res.status(400).json({ error: { type: "general", message: "Rol de usuario no válido" } });
        }

        const token = generateAccessToken(id!, name!, role as UserRole);
        const refreshToken = generateRefreshToken(id!, role as UserRole);

        res.cookie('access_token', token, cookieOptionsLogin);

        res.cookie('refresh_Token', token, cookieOptionsRefresh)


        return res.status(200).json({
            status,
            user: { id, name, role }
        });

    } catch (error: any) {

        if (error.status === 401 || error.errorType) {
            return res.status(error.status || 401).json({
                error: {
                    status: error.status,
                    type: error.errorType || "general",
                    message: error.message,
                    redirectTo: error.redirectTo
                }
            });
        }

        return res.status(500).json({
            error: { type: "general", message: "Error interno del servidor" }
        });
    }
};
