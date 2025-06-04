import db from '@/config/db';
import { Experience } from '@/models/Experience/Experience';

export const getMyExperienceRepository = async (emprendedorId: number): Promise<Experience | null> => {
    const sql = `
        SELECT 
            f.experiencia_id AS id,
            f.nombre AS name_experience,
            f.descripcion AS description,
            f.ubicacion AS location,
            f.fecha_creacion AS created_at,
            f.estado AS status,
            u.nombre AS entrepreneur_id
        FROM experiencia f
        LEFT JOIN usuario u ON f.emprendedor_id = u.usuario_id
        WHERE f.emprendedor_id = ?
    `;
    const [rows]: any = await db.execute(sql, [emprendedorId]);
    return rows[0] || null;
}; 