import { Request, Response } from "express";
import { deleteContentService } from "../../services/Content/deleteContentService";
import { deleteFromAzureService } from "../../services/Content/deleteFromAzureService";
import { getContentByIdService } from "../../services/Content/getContentByIdService";

export const deleteContentController = async (req: Request, res: Response) => {
    try {
        const { finca_id } = req.params;
        const emprendedor_id = req.body.userId;

        const content = await getContentByIdService(parseInt(finca_id), emprendedor_id);
        
        if (content) {
            
            if (content.images) {
                await deleteFromAzureService(content.images);
            }
            
            if (content.videos) {
                await deleteFromAzureService(content.videos);
            }
        }

        await deleteContentService(parseInt(finca_id), emprendedor_id);

        res.status(200).json({ mensaje: "Contenido eliminado correctamente" });
    } catch (error) {
        console.error("Error en deleteContentController:", error);
        res.status(500).json({ mensaje: "Error al eliminar contenido" });
    }
};