import { Request, Response } from 'express';
import { updateReviewsService } from '@/services/Reviews/updateReviewsService';
import { Review } from '@/models/Review/Review';

export const updateReviewController = async (req: Request, res: Response) => {
    try {
        const { review_id } = req.params;
        const user_id = req.body.userId;
        const { rating, review } = req.body;
        const reviewData: Review = {
            review_id: parseInt(review_id),
            user_id: user_id,
            rating: rating,
            review: review
        }
        const result = await updateReviewsService(reviewData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json("Error al actualizar valoración");
    }
};