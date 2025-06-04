import { Request, Response } from 'express';
import { createReviewsService } from '@/services/Reviews/createReviewsService';

export const createRviewsController = async (req: Request, res: Response) => {
    try {
        const { experiencie_id, valoracion, comentario } = req.body;
        const usuario_id = req.body.userId;

        const newReviews = {
            experiencie_id: parseInt(experiencie_id),
            usuario_id,
            valoracion: Math.min(Math.max(parseInt(valoracion), 1), 10), 
            comentario: comentario || null,
            infringe_normas: req.body.infringe_normas || false
        };

        await createReviewsService(newReviews);

        res.status(201).json({ 
            mensaje: "Valoración guardada correctamente",
            data: newReviews
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar valoración" });
    }
};