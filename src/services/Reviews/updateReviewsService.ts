import { Review } from "@/models/Review/Review";
import { updateReviewsRepository } from "@/repositories/Reviews/updateReviewsRepository";

export const updateReviewsService = async (reviewData: Review) => {
    return await updateReviewsRepository(reviewData);
};