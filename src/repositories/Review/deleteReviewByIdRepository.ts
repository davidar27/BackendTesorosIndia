import db from '@/config/db';

export const deleteReviewByIdRepository = async (review_id: number) => {
    const [result]: any = await db.execute(
        "DELETE FROM valoracion WHERE valoracion_id = ?",
        [review_id]
    );
    if (result.affectedRows === 0) {
        return "Valoración no encontrada";
    }
    return "Valoración eliminada correctamente.";
};