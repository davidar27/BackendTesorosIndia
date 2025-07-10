import db from '@/config/db';

export const getReviewByIdRepository = async (review_id: number) => {
    const sql = `
        SELECT 
            v.valoracion_id AS review_id,
            u.usuario_id AS userId,
            u.nombre AS user_name,
            u.imagen AS user_image,
            DATE_FORMAT(CONVERT_TZ(v.fecha_creacion, '+00:00', '-05:00'), '%d/%m/%Y') AS review_date,
            v.puntuacion as rating,
            v.parent_id AS parent_review,
            v.usuarios_reportaron AS reporting_users,
            v.infringe_normas AS break_rules,
            v.comentario AS comment
        FROM valoracion v
        JOIN usuario u ON v.usuario_id = u.usuario_id
        WHERE v.valoracion_id = ?
        ORDER BY v.fecha_creacion DESC;
    `;
    const [rows]: any = await db.execute(sql, [review_id]);
    return rows[0];
}; 