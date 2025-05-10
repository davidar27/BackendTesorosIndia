import { Request, Response } from "express";
import UserAuth from "../../models/Auth/userAuth";
import dotenv from "dotenv";
import { authUserService } from "../../services/Auth/authUserService";
import { generateToken } from "../../helpers/User/generateToken";
import { log } from "console";
dotenv.config();

export const authUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        

        const login = await authUserService(new UserAuth(email, password));


        if (login.logged) {
            if (!process.env.KEY_TOKEN) {
                throw new Error("Clave de token no definida en variables de entorno");
            }

            if (!login.role || !["cliente", "administrador", "emprendedor"].includes(login.role)) {
                throw new Error("Role inválido o no definido");
            }

            const token = generateToken(
                { userId: login.id ?? 0, role: login.role as "cliente" | "administrador" | "emprendedor" },
                process.env.KEY_TOKEN,
                60
            );

            res.cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60,
            });
            
            return res.status(200).json({
                status: login.status,
                token: token,
                role: login.role,
                name: login.name,   
            });
        }

        return res.status(401).json({
            status: login.status
        });
    } catch (error: any) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
