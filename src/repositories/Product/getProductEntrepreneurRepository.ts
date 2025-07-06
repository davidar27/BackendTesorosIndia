import db from '@/config/db';

export const getProductEntrepreneurRepository = async (product_id: number) => {
    const sql = `
        SELECT 
            u.usuario_id AS entrepreneur_id,
            e.experiencia_id AS experience_id,
            s.servicio_id AS product_id
        FROM servicio s
        JOIN experiencia e ON s.experiencia_id = e.experiencia_id
        JOIN usuario u ON e.emprendedor_id = u.usuario_id
        WHERE s.servicio_id = ?
    `;
    const [rows]: any = await db.execute(sql, [product_id]);
    return rows;
}; 