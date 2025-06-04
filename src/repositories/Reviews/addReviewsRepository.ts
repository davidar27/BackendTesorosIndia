import db from '@/config/db';

export const createReviewsRepository = async (reviewsData: any) => {
    const { experiencie_id, usuario_id, valoracion, comentario, infringe_normas } = reviewsData;

    const query = `
        INSERT INTO servicio 
        (experiencie_id, usuario_id, valoracion, comentario, infringe_normas)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        valoracion = VALUES(valoracion),
        comentario = VALUES(comentario),
        infringe_normas = VALUES(infringe_normas)
    `;

    const values = [
        experiencie_id,
        usuario_id,
        valoracion,
        comentario,
        infringe_normas ? 1 : 0
    ];

    try {
        const [result]: any = await db.execute(query, values);
        return { ...reviewsData, servicio_id: result.insertId };
    } catch (error) {
        console.error("Error en createValoracionRepository:", error);
        throw new Error("Error al insertar valoración en la base de datos");
    }
};