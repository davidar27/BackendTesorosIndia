import db from '@/config/db';
import { User } from '@/models/User/User';

export const findClientByIdRepository = async (id: number): Promise<User | null> => {
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
            imagen,
            direccion
        FROM usuario 
        WHERE usuario_id = ? AND rol = 'cliente'
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
            role: 'cliente',
            verified: Boolean(row.verificado),
            image: row.imagen || '',
            address: row.direccion || undefined,
            token_version: row.token_version || 0
        });
    } catch (error) {
        throw new Error(`Error al buscar cliente por ID: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
}; 