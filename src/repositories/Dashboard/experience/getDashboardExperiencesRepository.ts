import db from '@/config/db';
import { Experience } from '@/models/Experience/Experience';

export const getDashboardExperiencesRepository = async (): Promise<Experience[]> => {
    const sql = `
        SELECT 
            f.experiencia_id AS id,
            f.nombre AS name_experience,
            f.ubicacion AS location,
            f.tipo AS type,
            f.logo AS logo,
            DATE_FORMAT(f.fecha_registro, '%d/%m/%Y') AS created_at,            
            f.estado AS status,
            u.nombre AS name_entrepreneur
        FROM experiencia f
        LEFT JOIN usuario u ON f.emprendedor_id = u.usuario_id
        ORDER BY f.fecha_registro DESC
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 