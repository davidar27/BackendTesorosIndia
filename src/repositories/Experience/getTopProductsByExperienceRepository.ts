import db from '../../config/db';

export async function getTopProductsByExperienceRepository(experiencia_id: number) {
    const query = `
        SELECT 
            s.servicio_id as product_id,
            s.nombre AS product_name,
            s.experiencia_id,
            SUM(fd.cantidad) AS total_sold
        FROM factura_detalle fd
        JOIN servicio s ON fd.servicio_id = s.servicio_id
        WHERE s.experiencia_id = ? AND s.tipo = 'producto'
        GROUP BY s.servicio_id, s.nombre, s.experiencia_id
        ORDER BY total_sold DESC
        LIMIT 3;
    `;
    const [rows] = await db.query(query, [experiencia_id]);
    return rows;
} 