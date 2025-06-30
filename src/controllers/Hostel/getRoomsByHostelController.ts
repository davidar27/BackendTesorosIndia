import { getRoomsByHostelService } from '@/services/Hostel/getRoomsByHostelService';
import { Request, Response } from 'express';

export const getRoomsByHostelController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_hostel } = req.params
        const rooms = await getRoomsByHostelService(parseInt(id_hostel));
        res.status(200).json(rooms);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener los habitaciones del hostal"
        });
    }
}; 