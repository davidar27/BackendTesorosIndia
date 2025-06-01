import { createReviewsRepository } from "@/repositories/Reviews/addReviewsRepository";

export const createReviewsService = async (reviewsData: any) => {
    if (!reviewsData.finca_id || !reviewsData.usuario_id) {
        throw new Error("Faltan campos obligatorios");
    }

    return await createReviewsRepository(reviewsData);
};