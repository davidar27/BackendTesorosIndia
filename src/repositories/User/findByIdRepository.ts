import db from '@/config/db';
import { User } from '@/models/User/User';


export const findByIdRepository = async (id: string): Promise<User | null> => {
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
            descripcion_emprendedor as descripcion
        FROM usuario 
        WHERE usuario_id = ?
    `;
    
    const [rows]: any = await db.execute(sql, [id]);
    if (rows.length === 0) return null;
    
    const row = rows[0];
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
};

