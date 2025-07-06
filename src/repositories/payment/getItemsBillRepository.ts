import db from '@/config/db';

export const getItemsBillRepository = async (bill_id: number) => {
    const sql = `
        SELECT
            fd.factura_detalle_id AS item_bill_id,
            fd.servicio_id AS item_id,
            fd.factura_id AS bill_id,
            fd.cantidad AS quantity,
            fd.precio_unitario AS price,

            s.nombre AS name,
            s.tipo AS type,

            s.experiencia_id AS experience_id,

            s.duracion AS duration

        FROM factura_detalle fd
        JOIN servicio s ON fd.servicio_id = s.servicio_id
        WHERE fd.factura_id = ?
    `;
    const [rows]: any = await db.execute(sql, [bill_id]);
    return rows;
}; 