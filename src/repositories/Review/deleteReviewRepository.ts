import db from '@/config/db';

export const deleteReviewRepository = async (review_id: number, user_id: number) => {
    const [result]: any = await db.execute(
        "DELETE FROM valoraciones WHERE valoracion_id = ? AND usuario_id = ?",
        [review_id, user_id]
    );
    if (result.affectedRows === 0) {
        return "Valoración no encontrada o no autorizada";
    }
    return "Valoración eliminada correctamente.";
};