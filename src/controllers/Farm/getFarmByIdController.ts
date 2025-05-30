import { Request, Response } from "express";
import { getFarmByIdService } from "../../services/Farm/getFarmByIdService";

export const getFarmByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const emprendedor_id = req.body.userId;

        const Farm = await getFarmByIdService(parseInt(id), emprendedor_id);

        if (!Farm) {
            return res.status(404).json({ mensaje: "Contenido no encontrado" });
        }

        res.status(200).json(Farm);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el contenido" });
    }
};