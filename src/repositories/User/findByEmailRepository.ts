import db from '@/config/db';
import { User, UserRole } from '@/models/User/User';

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
            u.usuario_id,
            u.nombre,
            u.correo,
            u.contraseña,
            u.telefono,
            u.rol,
            u.verificado,
            u.imagen,
            u.descripcion,
            u.direccion,
            u.token_version,
            f.nombre as name_experience
        FROM usuario u
        LEFT JOIN experiencia f ON u.usuario_id = f.emprendedor_id
        WHERE u.correo = ?
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

        const baseUserData = {
            userId: row.usuario_id,
            name: row.nombre,
            email: row.correo,
            password: row.contraseña,
            phone: row.telefono || '',
            verified: Boolean(row.verificado),
            image: row.imagen || '',
            token_version: row.token_version || 0
        };

        switch (row.rol as UserRole) {
            case 'cliente':
                return new User({
                    ...baseUserData,
                    role: 'cliente',
                    address: row.direccion || undefined
                });
            case 'emprendedor':
                return new User({
                    ...baseUserData,
                    role: 'emprendedor',
                    name_experience: row.name_experience || 'Granja sin nombre',
                    description: row.descripcion || undefined
                });
            default:
                throw new Error(`Rol de usuario no válido: ${row.rol}`);
        }
    } catch (error) {
        throw new Error(`Error al buscar usuario por email: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
};