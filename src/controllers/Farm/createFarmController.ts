import { Request, Response } from 'express';
import { uploadToAzureService } from '@/services/Farm/uploadToAzureService';
import { createFarmService } from '@/services/Farm/createFarmService';

export const createFarmController = async (req: Request, res: Response) => {
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

        const newFarm = {
            name,
            description,
            location,
            images: imageUrls.length > 0 ? JSON.stringify(imageUrls) : null,
            videos: videoUrls.length > 0 ? JSON.stringify(videoUrls) : null,
            entrepreneur_id,
        };




        await createFarmService(newFarm);

        res.status(201).json({ mensaje: "Contenido guardado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar contenido" });
    }
};
