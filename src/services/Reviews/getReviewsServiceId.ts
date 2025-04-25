import { getReviewsByFincaRepositoryId } from "../../repositories/Reviews/getReviewsRepositoryID";

export const getReviewsByFincaServiceId = async (finca_id: number) => {
    return await getReviewsByFincaRepositoryId(finca_id);
};