import { setViewOneNotificationService } from '@/services/Notification/setViewOneNotificationService';
import { Request, Response } from 'express';

export const setViewOneNotificationController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { notificationId } = req.params
        console.log(notificationId);

        await setViewOneNotificationService(Number(notificationId));
        res.status(200).json("Notificacion vista con exito");
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al ver las notificaciones"
        });
    }
}; 