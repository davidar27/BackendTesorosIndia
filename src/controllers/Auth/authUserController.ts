import { Request, Response } from "express";
import UserAuth from "../../models/Auth/userAuth";
import { authUserService } from "../../services/Auth/authUserService";
import { generateAccessToken } from "../../helpers/Tokens/generateAccessToken";
import { UserRole } from "../../models/Auth/Auth";
import { cookieOptions } from "../../config/cookie";


export const authUserController = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son requeridos" });
        }

        const login = await authUserService(new UserAuth(email, password));

        if (!login.logged) {
            return res.status(401).json({ status: login.status });
        }

        const { id, role, name, status } = login;

        if (!id || !role || !name) {
            return res.status(500).json({ error: "ID o rol del usuario faltantes" });
        }


        const validRoles: UserRole[] = ["cliente", "administrador", "emprendedor"];
        if (!validRoles.includes(role as UserRole)) {
            return res.status(400).json({ error: "Rol de usuario no válido" });
        }

        const token = generateAccessToken(id, name, role as UserRole);

        res.cookie('access_token', token, cookieOptions);

        return res.status(200).json({
            status,
            user: { id, name, role }
        });

    } catch (error) {
        console.error("Error en authUserController:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
