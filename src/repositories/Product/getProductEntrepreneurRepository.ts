import db from '@/config/db';

export const getBillProductEntrepreneurRepository = async (bill_id: number) => {
    const sql = `
        SELECT 
            DISTINCT u.usuario_id AS entrepreneur_id
        FROM factura f
        JOIN factura_detalle fd ON f.factura_id = fd.factura_id
        JOIN servicio s ON fd.servicio_id = s.servicio_id
        JOIN experiencia e ON s.experiencia_id = e.experiencia_id
        JOIN usuario u ON e.emprendedor_id = u.usuario_id
        WHERE f.factura_id = ? 
    `;
    const [rows]: any = await db.execute(sql, [bill_id]);
    return rows;
}; 