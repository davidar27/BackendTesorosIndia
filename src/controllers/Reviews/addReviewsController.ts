import { Request, Response } from "express";
import { createReviewsService } from "../../services/Reviews/createReviewsService";

export const createRviewsController = async (req: Request, res: Response) => {
    try {
        const { finca_id, valoracion, comentario } = req.body;
        const usuario_id = req.body.userId; // Del middleware de autenticación

        const newReviews = {
            finca_id: parseInt(finca_id),
            usuario_id,
            valoracion: Math.min(Math.max(parseInt(valoracion), 1), 10), // Asegurar 1-10
            comentario: comentario || null,
            infringe_normas: req.body.infringe_normas || false
        };

        await createReviewsService(newReviews);

        res.status(201).json({ 
            mensaje: "Valoración guardada correctamente",
            data: newReviews
        });
    } catch (error) {
        console.error("Error en createValoracionController:", error);
        res.status(500).json({ mensaje: "Error al guardar valoración" });
    }
};