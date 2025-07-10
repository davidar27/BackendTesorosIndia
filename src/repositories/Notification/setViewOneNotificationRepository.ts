import db from '@/config/db';

export const setViewOneNotificationRepository = async (notificationId: number) => {
    
    const sql = `
        UPDATE notificacion n
        SET n.estado = 'Vista'
        WHERE n.notificacion_id = ?
    `;
    const [rows]: any = await db.execute(sql, [notificationId]);
    return rows;
}; 