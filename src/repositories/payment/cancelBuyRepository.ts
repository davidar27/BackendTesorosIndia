import db from '@/config/db';

export const cancelBuyRepository = async (bill_id: number, user_id: number) => {
    const sql = `

    `;
    const [rows]: any = await db.execute(sql, [bill_id, user_id]);
    return rows;
}; 