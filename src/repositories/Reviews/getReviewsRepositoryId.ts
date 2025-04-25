import db from "../../config/db";

export const getReviewsByFincaRepositoryId = async (finca_id: number) => {
    const [rows]: any = await db.execute(
        "SELECT servicio_id, finca_id, usuario_id, valoracion, comentario, infringe_normas FROM servicio WHERE finca_id = ?",
        [finca_id]
    );
    return rows;
};