import db from "../../config/db";

export const deleteReviewsRepository = async (
    servicio_id: number,
    usuario_id: number
) => {
    const [result]: any = await db.execute(
        "DELETE FROM servicio WHERE servicio_id = ? AND usuario_id = ?",
        [servicio_id, usuario_id]
    );

    if (result.affectedRows === 0) {
        throw new Error("Valoración no encontrada o no autorizada");
    }
};