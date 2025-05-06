import { getReviewsByFincaRepositoryId } from "../../repositories/Reviews/getReviewsRepositoryId";

export const getReviewsByFincaServiceId = async (finca_id: number) => {
    return await getReviewsByFincaRepositoryId(finca_id);
};