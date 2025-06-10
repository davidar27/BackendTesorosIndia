import db from '@/config/db';
import { Experience } from '@/models/Experience/Experience';


export const getAllExperienceRepository = async (): Promise<Experience> => {
    const sql = `SELECT 
    e.experiencia_id AS id,
    e.nombre AS name_experience,
	e.descripcion AS description,
    e.ubicacion AS location,
    e.fecha_creacion AS created_at,
    e.estado AS status,
    u.nombre AS name_entrepreneur
    FROM experiencia e
    LEFT JOIN usuario u ON e.emprendedor_id = u.usuario_id;`;
    const [rows]: any = await db.execute(sql);
    return rows;
};