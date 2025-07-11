import { getNotificationsService } from '@/services/Notification/getNotificationsService';
import { Request, Response } from 'express';

export const getNotificationsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params


        const notifications = await getNotificationsService(Number(userId));
        res.status(200).json(notifications);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener las categorías"
        });
    }
}; 