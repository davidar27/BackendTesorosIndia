import { getReviewsExperienceService } from '@/services/Experience/getReviewsExperienceService';
import { Request, Response } from 'express';

export const getReviewsExperienceController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_experience } = req.params;
        const reviews = await getReviewsExperienceService(parseInt(id_experience));
        res.status(200).json(reviews);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Error al obtener las valoraciones"
        });
    }
}; 