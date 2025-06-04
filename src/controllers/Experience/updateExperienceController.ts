import { Request, Response } from 'express';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';
import { deleteFromAzureService } from '@/services/Azure/deleteFromAzureService';
import { getExperienceByIdService } from '@/services/Experience/getExperienceByIdService';
import { updateExperienceService } from '@/services/Experience/updateExperienceService';

export const updateExperienceController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, location } = req.body;
        const entrepreneur_id = req.body.userId;


        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const Experience = await getExperienceByIdService(Number(id), entrepreneur_id);
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


        const imageUrls = [];
        const videoUrls = [];

        if (files?.images) {
            for (const image of files.images) {
                const url = await uploadToAzureService(image);
                imageUrls.push(url);
            }
        }

        if (files?.videos) {
            for (const video of files.videos) {
                const url = await uploadToAzureService(video);
                videoUrls.push(url);
            }
        }

        const updatedExperience = {
            id: parseInt(id),
            name: name || Experience.name,
            description: description || Experience.description,
            location: location || Experience.location,
            entrepreneur_id,
            images: imageUrls.length > 0 ? JSON.stringify(imageUrls) : null,
            videos: videoUrls.length > 0 ? JSON.stringify(videoUrls) : null,
        };

        await updateExperienceService(updatedExperience);

        res.status(200).json({
            mensaje: "Contenido actualizado correctamente"
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar contenido" });
    }
};