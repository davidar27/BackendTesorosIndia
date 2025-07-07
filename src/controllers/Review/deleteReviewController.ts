import { Request, Response } from 'express';
import { deleteReviewService } from '@/services/Review/deleteReviewService';

export const deleteReviewController = async (req: Request, res: Response) => {
    try {
        const { review_id } = req.params;
        const user_id = req.body.userId;

        
        const result = await deleteReviewService(parseInt(review_id), user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json("Error al eliminar valoración.");
    }
};