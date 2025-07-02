import { getReviewsExperienceService } from '@/services/Experience/getReviewsExperienceService';
import { Request, Response } from 'express';

export const getReviewsExperienceController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { experience_id } = req.params;
        const reviews = await getReviewsExperienceService(parseInt(experience_id));
        res.status(200).json(reviews);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener las valoraciones"
        });
    }
}; 