import { Request, Response } from 'express';
import { addReviewService } from '@/services/Review/addReviewService';
import { Review } from '@/models/Review/Review';

export const addReviewController = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.userId;
        const { type, entity_id, rating, review } = req.body;
        const reviewData: Review = {
            entity_id: entity_id,
            type: type,
            user_id: user_id,
            rating: rating,
            review: review || null
        };

        if (!user_id || !type || !entity_id || !rating) {
            return res.status(401).json({
                mensaje: "Faltan campos requeridos"
            });
        }
        
        await addReviewService(reviewData);
        res.status(201).json({
            mensaje: "Valoración enviada correctamente",
            review: reviewData
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar valoración" });
    }
};