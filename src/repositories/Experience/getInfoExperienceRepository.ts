import db from '@/config/db';

export const getInfoExperienceRepository = async (id_experience: number) => {
    const sql = `
        SELECT
            e.nombre AS name,
            e.tipo AS type,
            e.descripcion AS description,
            e.historia AS history
        FROM experiencia e
        WHERE e.experiencia_id = ?;
    `;
    const [rows]: any = await db.execute(sql, [id_experience]);
    return rows;
}; 