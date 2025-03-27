import { Request, Response } from "express";
import { uploadToAzureService } from "../../services/Content/uploadToAzureService";

export const uploadToAzureController = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ mensaje: "No se ha enviado ningún archivo" });
        }

        const fileUrl = await uploadToAzureService(req.file);

        if (!fileUrl) {
            return res.status(500).json({ mensaje: "Error al subir archivo a Azure" });
        }

        res.status(200).json({ url: fileUrl });
    } catch (error) {
        console.error("Error en uploadToAzureController:", error);
        res.status(500).json({ mensaje: "Error al subir archivo" });
    }
};
