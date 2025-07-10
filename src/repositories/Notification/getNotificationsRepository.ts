import db from '@/config/db';

export const getNotificationsRepository = async (userId: number) => {
    const sql = `
        SELECT 
            n.notificacion_id AS notification_id,
            n.usuario_id AS userId,
            n.mensaje AS message,
            n.tipo AS type,
            n.fecha_envio AS send_date,
            n.estado AS status
        FROM notificacion n
        WHERE n.usuario_id = ?
        ORDER BY n.fecha_envio DESC
        LIMIT 5
    `;
    const [rows]: any = await db.execute(sql, [userId]);
    return rows;
}; 