import { getReviewsByFincaRepository } from "@/repositories/Reviews/getReviewsRepository";

export const getReviewsByFincaService = async () => {
    return await getReviewsByFincaRepository();
};