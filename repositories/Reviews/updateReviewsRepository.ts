import db from "../../config/db";

export const updateReviewsRepository = async (
    servicio_id: number,
    usuario_id: number,
    updateData: {
        valoracion?: number;
        comentario?: string;
        infringe_normas?: boolean;
    }
) => {
    const updates = [];
    const values = [];

    if (updateData.valoracion !== undefined) {
        updates.push("valoracion = ?");
        values.push(updateData.valoracion);
    }
    if (updateData.comentario !== undefined) {
        updates.push("comentario = ?");
        values.push(updateData.comentario);
    }
    if (updateData.infringe_normas !== undefined) {
        updates.push("infringe_normas = ?");
        values.push(updateData.infringe_normas ? 1 : 0);
    }

    if (updates.length === 0) {
        throw new Error("No hay campos válidos para actualizar");
    }

    const query = `
        UPDATE servicio 
        SET ${updates.join(", ")}
        WHERE servicio_id = ? AND usuario_id = ?
    `;

    const [result]: any = await db.execute(query, [...values, servicio_id, usuario_id]);

    if (result.affectedRows === 0) {
        throw new Error("Valoración no encontrada o no autorizada");
    }
};