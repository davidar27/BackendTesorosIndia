import { Request, Response } from 'express';
import { updateReviewsService } from '@/services/Reviews/updateReviewsService';

export const updateReviewsController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuario_id = req.body.userId;
        const { valoracion, comentario, infringe_normas } = req.body;

        await updateReviewsService(
            parseInt(id),
            usuario_id,
            {
                valoracion: valoracion ? parseInt(valoracion) : undefined,
                comentario,
                infringe_normas
            }
        );

        res.status(200).json({ mensaje: "Valoración actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar valoración" });
    }
};