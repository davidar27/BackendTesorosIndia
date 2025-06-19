import db from '@/config/db';

export const getReviewsExperienceRepository = async (experience_id: number) => {
    const sql = `
        SELECT 
            v.valoracion_id AS review_id,
            u.usuario_id AS user_id,
            u.nombre AS user_name,
            u.imagen AS user_image,
            v.fecha_creacion AS review_date,
            v.puntuacion as rating,
            v.parent_id AS parent_review
        FROM valoracion v
        JOIN usuario u ON v.usuario_id = u.usuario_id
        JOIN experiencia e ON v.experiencia_id = e.experiencia_id
        WHERE e.experiencia_id = ?
        ORDER BY v.fecha_creacion DESC;
    `;
    const [rows]: any = await db.execute(sql, [experience_id]);
    return rows;
}; 