import bcrypt from 'bcryptjs';
import db from '../../config/db';
import UserAuth from '../../models/Auth/userAuth';
import { loginResult } from '../../models/Auth/Auth';

export const authUserRepository = async (user: UserAuth): Promise<loginResult> => {
    const sql = `SELECT usuario_id, contraseña, rol, nombre FROM usuario WHERE correo = ?`;
    const values = [user.email];

    try {
        const result: any = await db.execute(sql, values);
        const userRecord = result[0][0];


        const passwordMatch = await bcrypt.compare(user.password, userRecord.contraseña);
        if (!userRecord || !passwordMatch) {
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
            message: "Error al buscar el usuario",
            errorType: "general"
        };
    }
};
