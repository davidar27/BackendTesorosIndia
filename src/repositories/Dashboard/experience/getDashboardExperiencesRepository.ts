import db from '@/config/db';
import { Experience } from '@/models/Experience/Experience';

export const getDashboardExperiencesRepository = async (): Promise<Experience[]> => {
    const sql = `
        SELECT 
            f.experiencie_id AS id,
            f.nombre AS name_experience,
            f.descripcion AS description,
            f.ubicacion AS location,
            f.fecha_creacion AS created_at,
            f.estado AS status,
            u.nombre AS entrepreneur_id
        FROM experiencia f
        LEFT JOIN usuario u ON f.emprendedor_id = u.usuario_id
        ORDER BY f.fecha_creacion DESC
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 