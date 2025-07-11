import db from '../../config/db';

export async function getTotalIncomeByExperienceRepository(experiencia_id: number) {
    const query = `
        SELECT 
            s.experiencia_id,
            e.nombre AS experienceName,
            SUM(fd.cantidad * fd.precio_unitario) AS totalIncome
        FROM factura_detalle fd
        JOIN servicio s ON fd.servicio_id = s.servicio_id
        JOIN experiencia e ON s.experiencia_id = e.experiencia_id
        WHERE s.experiencia_id = ? 
          AND s.tipo IN ('producto', 'paquete') 
        GROUP BY s.experiencia_id, e.nombre
        ORDER BY totalIncome DESC;
    `;
    const [rows]: any = await db.query(query, [experiencia_id]);
    return rows[0];
} 