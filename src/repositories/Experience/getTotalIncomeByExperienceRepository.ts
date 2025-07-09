import db from '../../config/db';

export async function getTotalIncomeByExperienceRepository(experiencia_id: number) {
    const query = `
        SELECT 
            s.experiencia_id,
            e.nombre AS experience_name,
            SUM(fd.cantidad * fd.precio_unitario) AS total_income
        FROM factura_detalle fd
        JOIN servicio s ON fd.servicio_id = s.servicio_id
        JOIN experiencia e ON s.experiencia_id = e.experiencia_id
        WHERE s.experiencia_id = ? 
          AND s.tipo IN ('producto', 'paquete') 
        GROUP BY s.experiencia_id, e.nombre
        ORDER BY total_income DESC;
    `;
    const [rows] = await db.query(query, [experiencia_id]);
    return rows;
} 