import { deleteReviewRepository } from "@/repositories/Review/deleteReviewRepository";

export const deleteReviewService = async (review_id: number, user_id: number) => {
    return await deleteReviewRepository(review_id, user_id);
};