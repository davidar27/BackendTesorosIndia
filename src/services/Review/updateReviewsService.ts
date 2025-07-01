import { Review } from "@/models/Review/Review";
import { updateReviewsRepository } from "@/repositories/Review/updateReviewsRepository";

export const updateReviewsService = async (reviewData: Review) => {
    return await updateReviewsRepository(reviewData);
};