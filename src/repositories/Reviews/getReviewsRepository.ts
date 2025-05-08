import db from "../../config/db";

export const getReviewsByFincaRepository = async () => {
    const [rows]: any = await db.execute(
        "SELECT servicio_id, finca_id, usuario_id, valoracion, comentario, infringe_normas FROM servicio",
        
    );
    return rows;
};