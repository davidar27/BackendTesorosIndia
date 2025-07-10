import db from '@/config/db';

export const getCategoriesRepository = async () => {
    const sql = `
         SELECT 
            c.categoria_id AS id,
            c.nombre AS name
        FROM categoria c
        WHERE c.estado = 'activo'
        ORDER BY c.nombre DESC;


    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 