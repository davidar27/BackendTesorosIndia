import db from "../../config/db";
import { User } from "../../models/User/User";

interface VerificationResult {
    logged: boolean;
    status: string;
    message: string;
    errorType: string;
    id?: number;
    email?: string;
}

export const findByEmailRepository = async (email: string): Promise<User | VerificationResult | null> => {
    const sql = 'SELECT usuario_id, correo, verificado FROM usuario WHERE correo = ?';

    try {
        const [rows]: any = await db.execute(sql, [email]);

        if (rows.length === 0) return null;

        const row = rows[0];

        if (!row.verificado) {
            const result: VerificationResult = {
                logged: false,
                status: "Cuenta no verificada",
                message: "Por favor verifica tu cuenta antes de iniciar sesión. Revisa tu correo electrónico.",
                errorType: "unverified",
                id: row.usuario_id,
                email: row.correo
            };
            return result;
        }

        const userSql = 'SELECT * FROM usuario WHERE correo = ?';
        const [userRows]: any = await db.execute(userSql, [email]);

        if (userRows.length === 0) return null;

        const user = new User(
            userRows[0].usuario_id,
            userRows[0].nombre,
            userRows[0].correo,
            userRows[0].telefono,
            userRows[0].contraseña,
            userRows[0].verificado,
            userRows[0].rol
        );

        return user;

    } catch (error) {
        throw new Error('Error al buscar usuario por email');
    }
};