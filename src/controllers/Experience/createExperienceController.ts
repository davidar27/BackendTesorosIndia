import { Request, Response } from 'express';
import { uploadToAzureService } from '@/services/Azure/uploadToAzureService';
import { createExperienceService } from '@/services/Experience/createExperienceService';

export const createExperienceController = async (req: Request, res: Response) => {
    try {
        const { name, description, location } = req.body;
        const entrepreneur_id = req.body.userId;

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

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

        const newExperience = {
            name,
            description,
            location,
            images: imageUrls.length > 0 ? JSON.stringify(imageUrls) : null,
            videos: videoUrls.length > 0 ? JSON.stringify(videoUrls) : null,
            entrepreneur_id,
        };




        await createExperienceService(newExperience);

        res.status(201).json({ mensaje: "Contenido guardado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar contenido" });
    }
};
