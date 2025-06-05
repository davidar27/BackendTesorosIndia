import db from '@/config/db';

export const getDashboardCategoriesRepository = async () => {
    const sql = `
        SELECT 
            c.categoria_id AS id,
            c.nombre AS name,
            c.estado AS status,
            (SELECT COUNT(*) FROM servicio_categoria sc WHERE sc.categoria_id = c.categoria_id) as productsCount
        FROM categoria c
        ORDER BY c.nombre DESC;
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 