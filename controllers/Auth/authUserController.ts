import { Request, Response } from "express";
import UserAuth from "../../models/Auth/userAuth";
import tokenGenerator from "../../helpers/User/tokenGenerator";
import dotenv from "dotenv";
import { authUserService } from "../../services/Auth/authUserService";
dotenv.config();

export const authUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        const login = await authUserService(new UserAuth(email, password));

        if (login.logged) {
            if (!process.env.KEY_TOKEN) {
                throw new Error("Clave de token no definida en variables de entorno");
            }

            const token = tokenGenerator({ id_user: login.id, role: login.role }, process.env.KEY_TOKEN, 60);
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
            });
            return res.status(200).json({
                status: login.status,
                token: token,
            });
        }

        return res.status(401).json({
            status: login.status
        });
    } catch (error: any) {
        return res.status(500).json({ error: "Internal server error" });
    }

}
