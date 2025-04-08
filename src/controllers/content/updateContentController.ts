import { Request, Response } from "express";
import { uploadToAzureService } from "../../services/Content/uploadToAzureService";
import { updateContentService } from "../../services/Content/updateContentService";
import { getContentByIdService } from "../../services/Content/getContentByIdService";
import { deleteFromAzureService } from "../../services/Content/deleteFromAzureService";

export const updateContentController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, location } = req.body;
        const entrepreneur_id = req.body.userId;


        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const content = await getContentByIdService(Number(id), entrepreneur_id);
        if (!content) {
            return res.status(404).json({ message: 'Finca no encontrada' });

        }
        let images: string[] = [];
        let videos: string[] = [];

        if (typeof content.imagenes === "string") {
            images = JSON.parse(content.imagenes);

        }

        if (typeof content.videos === "string") {
            videos = JSON.parse(content.videos);
        }

        if (content) {
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

        const updatedContent = {
            id: parseInt(id),
            name: name || content.name,
            description: description || content.description,
            location: location || content.location,
            entrepreneur_id,
            images: imageUrls.length > 0 ? JSON.stringify(imageUrls) : null,
            videos: videoUrls.length > 0 ? JSON.stringify(videoUrls) : null,
        };

        await updateContentService(updatedContent);

        res.status(200).json({
            mensaje: "Contenido actualizado correctamente"
        });
    } catch (error) {
        console.error("Error en updateContentController:", error);
        res.status(500).json({ mensaje: "Error al actualizar contenido" });
    }
};