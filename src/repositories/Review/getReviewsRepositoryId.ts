import db from '@/config/db';

export const getReviewsByFincaRepositoryId = async (experiencie_id: number) => {
    const [rows]: any = await db.execute(
        "SELECT servicio_id, experiencie_id, usuario_id, valoracion, comentario, infringe_normas FROM servicio WHERE experiencie_id = ?",
        [experiencie_id]
    );
    return rows;
};