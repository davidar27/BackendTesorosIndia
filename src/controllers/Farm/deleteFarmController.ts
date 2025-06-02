import { Request, Response } from 'express';
import { deleteFromAzureService } from '@/services/Farm/deleteFromAzureService';
import { getFarmByIdService } from '@/services/Farm/getFarmByIdService';
import { deleteFarmService } from '@/services/Farm/deleteFarmService';


export const deleteFarmController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const entrepreneur_id = req.body.userId;

        const Farm = await getFarmByIdService(Number(id), entrepreneur_id);
        if (!Farm) {
            return res.status(404).json({ message: 'Finca no encontrada' });

        }
        let images: string[] = [];
        let videos: string[] = [];

        if (typeof Farm.imagenes === "string") {
            images = JSON.parse(Farm.imagenes);
            
        }

        if (typeof Farm.videos === "string") {
            videos = JSON.parse(Farm.videos);
        }

        if (Farm) {
            for (const img of images) {
                await deleteFromAzureService(img);
            }

            for (const vid of videos) {
                await deleteFromAzureService(vid);
            }
        }

        await deleteFarmService(Number(id), entrepreneur_id);

        res.status(200).json({ mensaje: "Contenido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar contenido" });
    }
};