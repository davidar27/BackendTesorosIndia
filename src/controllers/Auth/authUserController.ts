import { Request, Response } from "express";
import UserAuth from "../../models/Auth/userAuth";
import { authUserService } from "../../services/Auth/authUserService";
import { generateAccessToken } from "../../helpers/Tokens/generateAccessToken";
import { UserRole } from "../../models/Auth/Auth";



export const authUserController = async (req: Request, res: Response): Promise<Response> => {
    const isProduction = process.env.NODE_ENV === "production";

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
        console.log(token);

        const cookieOptions = {
            httpOnly: true,
            secure: !isProduction,
            sameSite: !isProduction ? 'none' as 'none' : 'lax' as 'lax',
            domain: !isProduction ? new URL(process.env.FRONTEND_URL || "").hostname : undefined,
            maxAge: 1000 * 60 * 60 * 24,
            path: '/',
            partitioned: true
        };


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
// Helper para extraer dominio correctamente
function getDomainFromUrl(url: string): string | undefined {
    try {
        const { hostname } = new URL(url);
        return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
    } catch {
        return undefined;
    }
}
