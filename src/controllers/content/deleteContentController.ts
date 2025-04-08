import { Request, Response } from "express";
import { deleteContentService } from "../../services/Content/deleteContentService";
import { deleteFromAzureService } from "../../services/Content/deleteFromAzureService";
import { getContentByIdService } from "../../services/Content/getContentByIdService";

export const deleteContentController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const entrepreneur_id = req.body.userId;

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

        await deleteContentService(Number(id), entrepreneur_id);

        res.status(200).json({ mensaje: "Contenido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar contenido" });
    }
};