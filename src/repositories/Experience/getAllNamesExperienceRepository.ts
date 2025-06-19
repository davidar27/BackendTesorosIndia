import db from '@/config/db';
import { Experience } from '@/models/Experience/Experience';


export const getAllNamesExperienceRepository = async (): Promise<Experience> => {
    const sql = `SELECT experiencia_id AS id, nombre AS name_experience FROM experiencia WHERE estado = 'publicada'`;
    const [rows]: any = await db.execute(sql);
    return rows;
};