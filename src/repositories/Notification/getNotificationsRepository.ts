import db from '@/config/db';

export const getNotificationsRepository = async (user_id: number) => {
    const sql = `
        SELECT 
            n.notificacion_id AS notification_id,
            n.usuario_id AS user_id,
            n.mensaje AS message,
            n.tipo AS type,
            n.fecha_envio AS send_date,
            n.estado AS status
        FROM notificacion n
        WHERE n.usuario_id = ?
        ORDER BY n.fecha_envio DESC
    `;
    const [rows]: any = await db.execute(sql, [user_id]);
    return rows;
}; 