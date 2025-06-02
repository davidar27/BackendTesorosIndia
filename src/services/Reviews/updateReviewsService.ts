import { updateReviewsRepository } from "@/repositories/Reviews/updateReviewsRepository";

export const updateReviewsService = async (
    servicio_id: number,
    usuario_id: number,
    updateData: {
        valoracion?: number;
        comentario?: string;
        infringe_normas?: boolean;
    }
) => {
    if (updateData.valoracion && (updateData.valoracion < 1 || updateData.valoracion > 10)) {
        throw new Error("La valoración debe ser entre 1 y 10");
    }

    return await updateReviewsRepository(servicio_id, usuario_id, updateData);
};