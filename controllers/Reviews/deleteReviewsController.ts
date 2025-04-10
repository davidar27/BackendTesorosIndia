import { Request, Response } from "express";
import { deleteReviewsService } from "../../services/Reviews/deleteReviewsService";

export const deleteReviewsController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuario_id = req.body.userId;

        await deleteReviewsService(parseInt(id), usuario_id);

        res.status(200).json({ mensaje: "Valoración eliminada correctamente" });
    } catch (error) {
        console.error("Error en deleteValoracionController:", error);
        res.status(500).json({ mensaje: "Error al eliminar valoración" });
    }
};