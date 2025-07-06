import db from '@/config/db';

export const getReviewsByProduct = async (product_id: number) => {
    const [rows]: any = await db.execute(
        `
        SELECT 
            v.valoracion_id AS review_id,
            u.usuario_id AS user_id,
            u.nombre AS user_name,
            u.imagen AS user_image,
            DATE_FORMAT(CONVERT_TZ(v.fecha_creacion, '+00:00', '-05:00'), '%d/%m/%Y') AS review_date,
            v.puntuacion as rating,
            v.parent_id AS parent_review,
            v.comentario AS review
        FROM valoracion v
        JOIN usuario u ON v.usuario_id = u.usuario_id
        JOIN servicio s ON v.producto_id = s.servicio_id
        WHERE s.servicio_id = ?
        ORDER BY v.fecha_creacion DESC;
        `,
        [product_id]
    );
    return rows;
};