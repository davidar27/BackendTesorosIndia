import db from '@/config/db';
import { Review } from '@/models/Review/Review';

export const updateReviewsRepository = async (reviewData: Review) => {
    const { review_id, user_id, rating, review } = reviewData;
    const updates = [];
    const values = [];
    
    if (rating !== undefined && rating !== null) {
        updates.push("puntuacion = ?");
        values.push(rating);
    }
    
    if (review !== undefined && review !== null) {
        updates.push("comentario = ?");
        values.push(review);
    }
    
    if (updates.length === 0) {
        return "No hay campos para actualizar.";
    }
    
    const query = `
        UPDATE valoracion 
        SET ${updates.join(", ")}
        WHERE valoracion_id = ? AND usuario_id = ?
    `;
    
    try {
        const [result]: any = await db.execute(query, [...values, review_id, user_id]);
        if (result.affectedRows === 0) {
            return "Valoración no encontrada o no autorizada.";
        }
        return "Valoración actualizada correctamente.";
    } catch (error) {
        console.error("Error en updateReviewsRepository:", error);
        throw new Error("Error al actualizar la valoración en la base de datos");
    }
};