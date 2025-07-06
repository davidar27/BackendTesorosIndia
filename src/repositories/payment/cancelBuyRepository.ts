import db from '@/config/db';

export const cancelBuyRepository = async (bill_id: number, user_id: number) => {
    const sql = `
        UPDATE factura
        SET estado = 'cancelada'
        WHERE factura_id = ? AND usuario_id = ?
    `;
    const [rows]: any = await db.execute(sql, [bill_id, user_id]);
    return rows;
}; 