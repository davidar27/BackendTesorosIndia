
import db from '@/config/db';

export const getInfoReserveRepository = async (room_id: number) => {
    const sql = `

    `;
    const [rows]: any = await db.execute(sql, [room_id]);
    return rows;
}; 