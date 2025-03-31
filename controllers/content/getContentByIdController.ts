// ../controller/content/getContentByIdController.ts
import { Request, Response } from "express";
import { getContentByIdService } from "../../services/Content/getContentByIdService";

export const getContentByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const emprendedor_id = req.body.userId;

        const content = await getContentByIdService(parseInt(id), emprendedor_id);

        if (!content) {
            return res.status(404).json({ mensaje: "Contenido no encontrado" });
        }

        res.status(200).json(content);
    } catch (error) {
        console.error("Error en getContentByIdController:", error);
        res.status(500).json({ mensaje: "Error al obtener el contenido" });
    }
};