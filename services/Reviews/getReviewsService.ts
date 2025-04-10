import { getReviewsByFincaRepository } from "../../repositories/Reviews/getReviewsRepository";

export const getReviewsByFincaService = async (finca_id: number) => {
    return await getReviewsByFincaRepository(finca_id);
};