import db from '@/config/db';

export const setViewNotificationsRepository = async (userId: number) => {
    const sql = `
        UPDATE notificacion n
        SET n.estado = 'Vista'
        WHERE n.usuario_id = ?
    `;
    const [rows]: any = await db.execute(sql, [userId]);
    return rows;
}; 