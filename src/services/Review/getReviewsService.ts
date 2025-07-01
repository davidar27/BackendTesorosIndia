import { getReviewsByFincaRepository } from "@/repositories/Review/getReviewsRepository";

export const getReviewsByFincaService = async () => {
    return await getReviewsByFincaRepository();
};