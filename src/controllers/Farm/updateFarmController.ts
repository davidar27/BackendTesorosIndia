import { Request, Response } from "express";
import { uploadToAzureService } from "../../services/Farm/uploadToAzureService";

import { deleteFromAzureService } from "../../services/Farm/deleteFromAzureService";
import { getFarmByIdService } from "../../services/Farm/getContentByIdService";
import { updateFarmService } from "../../services/Farm/updateFarmService";

export const updateFarmController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, location } = req.body;
        const entrepreneur_id = req.body.userId;


        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

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

        const updatedFarm = {
            id: parseInt(id),
            name: name || Farm.name,
            description: description || Farm.description,
            location: location || Farm.location,
            entrepreneur_id,
            images: imageUrls.length > 0 ? JSON.stringify(imageUrls) : null,
            videos: videoUrls.length > 0 ? JSON.stringify(videoUrls) : null,
        };

        await updateFarmService(updatedFarm);

        res.status(200).json({
            mensaje: "Contenido actualizado correctamente"
        });
    } catch (error) {
        console.error("Error en updateFarmController:", error);
        res.status(500).json({ mensaje: "Error al actualizar contenido" });
    }
};