import { getHostelsService } from '@/services/Hostel/getHostelsService';
import { Request, Response } from 'express';

export const getHostelsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const hostels = await getHostelsService();
        res.status(200).json(hostels);
    } catch (error: any) {
        res.status(500).json({ 
            error: error.message || "Error al obtener los hostales" 
        });
    }
}; 