import { Request, Response } from 'express';
import { deleteFromAzureService } from '@/services/Azure/deleteFromAzureService';
import { getExperienceByIdService } from '@/services/Experience/getExperienceByIdService';
import { deleteExperienceService } from '@/services/Experience/deleteExperienceService';


export const deleteExperienceController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const entrepreneur_id = req.body.userId;

        const Experience = await getExperienceByIdService(Number(id));
        if (!Experience) {
            return res.status(404).json({ message: 'experiencia no encontrada' });

        }
        let images: string[] = [];
        let videos: string[] = [];

        if (typeof Experience.imagenes === "string") {
            images = JSON.parse(Experience.imagenes);
            
        }

        if (typeof Experience.videos === "string") {
            videos = JSON.parse(Experience.videos);
        }

        if (Experience) {
            for (const img of images) {
                await deleteFromAzureService(img);
            }

            for (const vid of videos) {
                await deleteFromAzureService(vid);
            }
        }

        await deleteExperienceService(Number(id), entrepreneur_id);

        res.status(200).json({ mensaje: "Contenido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar contenido" });
    }
};