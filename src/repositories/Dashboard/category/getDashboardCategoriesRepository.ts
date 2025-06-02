import db from '@/config/db';

export const getDashboardCategoriesRepository = async () => {
    const sql = `
        SELECT 
            c.categoria_id AS id,
            c.nombre AS name,
            c.descripcion AS description,
            c.estado AS status,
            DATE_FORMAT(c.fecha_creacion, '%d/%m/%Y') AS created_at,
            (SELECT COUNT(*) FROM finca f WHERE f.categoria_id = c.categoria_id) as total_farms
        FROM categoria c
        ORDER BY c.fecha_creacion DESC
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 