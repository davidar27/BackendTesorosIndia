import { Request, Response } from "express";
import { uploadToAzureService } from "../../services/Content/uploadToAzureService";
import { createContentService } from "../../services/Content/createContentService";

export const createContentController = async (req: Request, res: Response) => {
    try {
    

        const { nombre, descripcion, ubicacion } = req.body;
        const emprendedor_id = req.body.userId

        let fileUrl = null;
        if (req.file) {
            fileUrl = await uploadToAzureService(req.file);
        }

        const newContent = { 
            nombre, 
            descripcion, 
            ubicacion,
            emprendedor_id, 
            images: fileUrl || null, 
            videos: null 
        };

        await createContentService(newContent);

        res.status(201).json({ mensaje: "Contenido guardado correctamente" });
    } catch (error) {
        console.error("Error en createContentController:", error);
        res.status(500).json({ mensaje: "Error al guardar contenido" });
    }
};
