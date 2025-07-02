import { getReviewsByFincaRepositoryId } from "@/repositories/Review/getReviewsRepositoryId";

export const getReviewsByFincaServiceId = async (experiencie_id: number) => {
    return await getReviewsByFincaRepositoryId(experiencie_id);
};