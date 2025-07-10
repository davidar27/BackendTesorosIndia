import { setViewNotificationsService } from '@/services/Notification/setViewNotificationsService';
import { Request, Response } from 'express';

export const setViewNotificationsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params
        await setViewNotificationsService(Number(userId));
        res.status(200).json("Notificaciones vistas con exito");
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al ver las notificaciones"
        });
    }
}; 