import db from '@/config/db';

export const setViewNotificationsRepository = async (user_id: number) => {
    const sql = `
        UPDATE notificacion n
        SET n.estado = 'Vista'
        WHERE n.usuario_id = ?
    `;
    const [rows]: any = await db.execute(sql, [user_id]);
    return rows;
}; 