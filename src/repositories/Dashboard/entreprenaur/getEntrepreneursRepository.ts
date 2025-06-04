import db from '@/config/db';
import { User } from '@/models/User/User';

export const getEntrepreneursRepository = async (): Promise<User[]> => {
    const sql = `
        SELECT 
            u.usuario_id AS id,
            u.nombre AS name,
            u.correo AS email,
            u.telefono AS phone,
            DATE_FORMAT(u.fecha_registro, '%d/%m/%Y') AS joinDate,
            u.estado AS status,
            u.imagen AS image,
            f.nombre AS name_experience
        FROM usuario u
        LEFT JOIN experiencia f ON u.usuario_id = f.emprendedor_id
        WHERE u.rol = 'emprendedor'
        ORDER BY u.fecha_registro DESC
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 