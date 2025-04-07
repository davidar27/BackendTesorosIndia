import { Request, Response } from "express";
import { uploadToAzureService } from "../../services/Content/uploadToAzureService";
import { updateContentService } from "../../services/Content/updateContentService";
import { deleteFromAzureService } from "../../services/Content/deleteFromAzureService";
import { getContentByIdService } from "../../services/Content/getContentByIdService";

export const updateContentController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, description, ubicacion } = req.body;
        const emprendedor_id = req.body.userId;


        const currentContent = await getContentByIdService(parseInt(id), emprendedor_id);

        if (!currentContent) {
            return res.status(404).json({ mensaje: "Contenido no encontrado" });
        }

        let fileUrl = currentContent.images;

        if (req.file) {
            if (currentContent.images) {
                await deleteFromAzureService(currentContent.images);
            }
            fileUrl = await uploadToAzureService(req.file);
        }

        const updatedContent = {
            id: parseInt(id),
            nombre: nombre || currentContent.nombre,
            description: description || currentContent.description,
            ubicacion: ubicacion || currentContent.ubicacion,
            emprendedor_id,
            images: fileUrl,
            videos: currentContent.videos
        };

        await updateContentService(updatedContent);

        res.status(200).json({
            mensaje: "Contenido actualizado correctamente",
            content: updatedContent
        });
    } catch (error) {
        console.error("Error en updateContentController:", error);
        res.status(500).json({ mensaje: "Error al actualizar contenido" });
    }
};