import { deleteReviewsRepository } from "@/repositories/Reviews/deleteReviewsRepository";

export const deleteReviewsService = async (
    servicio_id: number,
    usuario_id: number
) => {
    return await deleteReviewsRepository(servicio_id, usuario_id);
};