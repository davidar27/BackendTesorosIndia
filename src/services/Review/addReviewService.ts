import { Review } from "@/models/Review/Review";
import { addReviewRepository } from "@/repositories/Review/addReviewRepository";

export const addReviewService = async (reviewData: Review) => { 
    return await addReviewRepository(reviewData);
};