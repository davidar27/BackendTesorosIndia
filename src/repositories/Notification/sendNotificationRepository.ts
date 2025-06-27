import db from "@/config/db";
import { NotificationModel } from "@/models/Notification/Notification";

export const sendNotificationsRepository = async (notification: NotificationModel) => {
    const sql = `
        INSERT INTO notificacion (
            usuario_id,
            mensaje,
            tipo
        ) VALUES (?, ?, ?)
    `;
    const values = [
        notification.user_id,
        notification.message,
        notification.type,
    ];
    const [rows]: any = await db.execute(sql, values);
    return rows;
};