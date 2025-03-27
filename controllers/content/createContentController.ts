import { Request, Response } from "express";
import { uploadToAzureService } from "../../services/Content/uploadToAzureService";
import { createContentService } from "../../services/Content/createContentService";

export const createContentController = async (req: Request, res: Response) => {
    try {
    
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);

        const { title, description } = req.body;
        const emprendedor_id = req.body.userId
        console.log(emprendedor_id);
        

        if (!title || !description || !emprendedor_id) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        let fileUrl = null;
        if (req.file) {
            fileUrl = await uploadToAzureService(req.file);
        }

        const newContent = { 
            title, 
            description, 
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
