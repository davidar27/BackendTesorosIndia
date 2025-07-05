import db from '@/config/db';
import { User } from '@/models/User/User';

export const findUserByIdRepository = async (id: number): Promise<User | null> => {
    const sql = `
        SELECT 
    u.usuario_id,
    u.correo,
    u.contraseña,
    u.rol,
    u.nombre,
    u.telefono,
    u.verificado,
    u.token_version,
    u.imagen,
    u.direccion,
    u.estado,
    e.experiencia_id AS experience_id
    FROM usuario u
    LEFT JOIN experiencia e ON u.usuario_id = e.emprendedor_id
    WHERE u.usuario_id = ?;
    `;

    try {
        const [rows]: any = await db.execute(sql, [id]);
        if (rows.length === 0) return null;

        const row = rows[0];
        return new User({
            userId: row.usuario_id,
            name: row.nombre,
            email: row.correo,
            password: row.contraseña,
            phone: row.telefono || '',
            role: row.rol,
            address: row.direccion || '',
            verified: Boolean(row.verificado),
            image: row.imagen || '',
            status: row.estado || '',
            token_version: row.token_version || 0,
            experience_id: row.experience_id || undefined
        });
    } catch (error) {
        throw new Error(`Error al buscar usuario por ID: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
}; 