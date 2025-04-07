import bcrypt from 'bcryptjs';
import db from '../../config/db';
import UserAuth from '../../models/Auth/userAuth';

export interface loginResult {
    logged: boolean;
    status: string;
    id?: number;
    role?: string;
}


export const authUserRepository = async (user: UserAuth): Promise<loginResult> => {
    try {
        
        const sql = `SELECT usuario_id, contraseña, rol FROM usuario WHERE correo = ?`;
        const values = [user.email];
        const result: any = await db.execute(sql, values);
        const userRecord = result[0][0];
        
        if (!userRecord) {
            return { logged: false, status: "Usuario o contraseña inválidos" };
        }

        const passwordValid = await bcrypt.compare(user.password, userRecord.contraseña);

        

        if (!passwordValid) {
            return { logged: false, status: "Usuario o contraseña inválidos" };
        }

        return {
            logged: true,
            status: "Autenticación exitosa",
            id: userRecord.usuario_id,
            role: userRecord.rol,
        };

    } catch (error: any) {
        throw new Error(`Error en el repositorio de autenticación: ${error.message}`);
    }
}

