import { Request, Response } from "express";
import { deleteContentService } from "../../services/Content/deleteContentService";
import { deleteFromAzureService } from "../../services/Content/deleteFromAzureService";
import { getContentByIdService } from "../../services/Content/getContentByIdService";

export const deleteContentController = async (req: Request, res: Response) => {
    try {
        const { finca_id } = req.params;
        const emprendedor_id = req.body.userId;



        const content = await getContentByIdService(Number(finca_id), emprendedor_id);
        if (!content) {
            return res.status(404).json({ message: 'Finca no encontrada' });

        }
        let images: string[] = [];
        let videos: string[] = [];

        if (typeof content.images === "string") {
            const parsed = JSON.parse(content.images);
            if (Array.isArray(parsed)) {
                images = parsed;
                images.forEach(img => {
                    console.log("Imagen:", img);
                });
            } else {
                images = [parsed];
                console.log("Imagen única:", parsed);
            }
        }

        if (typeof content.videos === "string") {
            try {
                videos = JSON.parse(content.videos);
                videos.forEach((video) => {
                    console.log("Video:", video);
                });
            } catch (error) {
                console.error("Error al parsear videos:", error);
            }
        }

        if (content) {
            for (const img of images) {
                await deleteFromAzureService(img);
            }

            for (const vid of videos) {
                await deleteFromAzureService(vid);
            }
        }


        await deleteContentService(Number(finca_id), emprendedor_id);

        res.status(200).json({ mensaje: "Contenido eliminado correctamente" });
    } catch (error) {
        console.error("Error en deleteContentController:", error);
        res.status(500).json({ mensaje: "Error al eliminar contenido" });
    }
};