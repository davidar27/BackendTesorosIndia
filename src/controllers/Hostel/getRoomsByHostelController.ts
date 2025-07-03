import { getRoomsByHostelService } from '@/services/Hostel/getRoomsByHostelService';
import { Request, Response } from 'express';

export const getRoomsByHostelController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { hostel_id } = req.params
        const rooms = await getRoomsByHostelService(parseInt(hostel_id));
        res.status(200).json(rooms);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener los habitaciones del hostal"
        });
    }
}; 