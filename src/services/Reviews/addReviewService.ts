import { Review } from "@/models/Review/Review";
import { addReviewRepository } from "@/repositories/Reviews/addReviewRepository";

export const addReviewService = async (reviewData: Review) => { 
    return await addReviewRepository(reviewData);
};