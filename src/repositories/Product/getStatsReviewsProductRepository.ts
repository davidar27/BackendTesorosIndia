import db from '@/config/db';

export const getStatsReviewsProductRepository = async (product_id: number) => {
    const sql = `
        SELECT 
            ROUND(AVG(v.puntuacion), 1) as rating,
            COUNT(v.puntuacion) as total,
            ROUND(SUM(CASE WHEN v.puntuacion BETWEEN 9 AND 10 THEN 1 ELSE 0 END) * 100.0 / COUNT(v.puntuacion), 0) as percent_5,
            ROUND(SUM(CASE WHEN v.puntuacion BETWEEN 7 AND 8 THEN 1 ELSE 0 END) * 100.0 / COUNT(v.puntuacion), 0) as percent_4,
            ROUND(SUM(CASE WHEN v.puntuacion BETWEEN 5 AND 6 THEN 1 ELSE 0 END) * 100.0 / COUNT(v.puntuacion), 0) as percent_3,
            ROUND(SUM(CASE WHEN v.puntuacion BETWEEN 3 AND 4 THEN 1 ELSE 0 END) * 100.0 / COUNT(v.puntuacion), 0) as percent_2,
            ROUND(SUM(CASE WHEN v.puntuacion BETWEEN 1 AND 2 THEN 1 ELSE 0 END) * 100.0 / COUNT(v.puntuacion), 0) as percent_1
        FROM valoracion v
        JOIN servicio s ON v.producto_id = s.servicio_id
        WHERE s.servicio_id = ?
        GROUP BY s.servicio_id;
    `;
    const [rows]: any = await db.execute(sql, [product_id]);
    return rows;
}; 