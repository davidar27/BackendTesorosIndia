import db from '@/config/db';

export const getCategoriesRepository = async () => {
    const sql = `
        SELECT 
        c.categoria_id AS id,
        c.nombre AS name,
        COUNT(s.servicio_id) AS productsCount
    FROM categoria c
    LEFT JOIN servicio_categoria sc ON c.categoria_id = sc.categoria_id
    LEFT JOIN servicio s ON sc.servicio_id = s.servicio_id
    WHERE c.estado = 'activo' AND s.tipo = 'producto'
    GROUP BY c.categoria_id, c.nombre
    ORDER BY c.nombre DESC;

    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 