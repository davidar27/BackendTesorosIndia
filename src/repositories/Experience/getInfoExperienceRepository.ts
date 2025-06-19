import db from '@/config/db';

export const getInfoExperienceRepository = async (id_experience: number) => {
    const sql = `
        SELECT
            e.experiencia_id as id,
            e.nombre AS name,
            e.tipo AS type,
            e.descripcion AS description,
            e.historia AS history,
            e.imagen as image,
            e.latitud as lat,
            e.longitud as lng
        FROM experiencia e
        WHERE e.experiencia_id = ?;
    `;
    const [rows]: any = await db.execute(sql, [id_experience]);
    return rows;
}; 