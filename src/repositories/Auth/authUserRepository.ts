import bcrypt from 'bcryptjs';
import db from '../../config/db';
import UserAuth from '../../models/Auth/userAuth';
import { loginResult } from '../../models/Auth/Auth';

export const authUserRepository = async (user: UserAuth): Promise<loginResult> => {
    const sql = `SELECT usuario_id, contraseña, rol, nombre, verificado FROM usuario WHERE correo = ?`;
    const values = [user.email];

    try {
        const result: any = await db.execute(sql, values);
        const userRecord = result[0][0];

        if (!userRecord) {
            return {
                logged: false,
                status: "Error de autenticación",
                message: "El correo o la contraseña son incorrectos.",
                errorType: "general",
            };
        }

        if (!userRecord.verificado) {
            return {
                logged: false,
                status: "Cuenta no verificada",
                message: "Por favor verifica tu cuenta antes de iniciar sesión. Revisa tu correo electrónico.",
                errorType: "unverified",
                id: userRecord.usuario_id
            };
        }

        const passwordMatch = await bcrypt.compare(user.password, userRecord.contraseña);
        if (!passwordMatch) {
            return {
                logged: false,
                status: "Error de autenticación",
                message: "El correo o la contraseña son incorrectos.",
                errorType: "general",
            };
        }

        return {
            logged: true,
            status: "Autenticación exitosa",
            id: userRecord.usuario_id,
            role: userRecord.rol,
            name: userRecord.nombre
        };

    } catch (error) {
        return {
            logged: false,
            status: "Error en el repositorio",
            message: "Ocurrió un error al intentar autenticar. Por favor intenta nuevamente.",
            errorType: "server"
        };
    }
};