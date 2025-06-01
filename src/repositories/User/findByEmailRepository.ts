import db from '@/config/db';
import { User } from '@/models/User/User';

interface VerificationResult {
    logged: boolean;
    status: string;
    message: string;
    errorType: string;
    userId?: number;
    email?: string;
    role?: string;
    token_version?: number;
}

export const findByEmailRepository = async (email: string): Promise<User | VerificationResult | null> => {
    const sql = `
        SELECT 
            usuario_id,
            nombre,
            correo,
            telefono,
            contraseña,
            verificado,
            rol,
            token_version,
            descripcion_emprendedor
        FROM usuario 
        WHERE correo = ?
    `;

    try {
        const [rows]: any = await db.execute(sql, [email]);

        if (rows.length === 0) {
            return null;
        }

        const row = rows[0];

        if (!row.verificado) {
            const result: VerificationResult = {
                logged: false,
                status: "Cuenta no verificada",
                message: "Por favor verifica tu cuenta antes de iniciar sesión. Revisa tu correo electrónico.",
                errorType: "unverified",
                userId: row.usuario_id,
                email: row.correo,
                role: row.rol,
                token_version: row.token_version
            };
            return result;
        }

        const user = new User(
            row.nombre,
            row.correo,
            row.telefono || '',
            row.contraseña,
            row.verificado,
            row.rol,
            row.usuario_id,
            row.descripcion || '',
            row.token_version || 0
        );

        return user;

    } catch (error) {
        throw new Error(`Error al buscar usuario por email: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
};