import db from '@/config/db';

export const getBillByIDRepository = async (bill_id: number) => {
    const sql = `
        SELECT 
            f.factura_id AS bill_id,
            u.usuario_id AS user_id,
            u.nombre AS user_name,
            f.total AS price,
            f.fecha AS date
        FROM factura f
        JOIN usuario u ON f.usuario_id = u.usuario_id
        WHERE f.factura_id = ?
    `;
    const [rows]: any = await db.execute(sql, [bill_id]);
    return rows;
}; 