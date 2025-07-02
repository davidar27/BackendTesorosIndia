import db from '@/config/db';

export const getPackageDetailsRepository = async (id: number) => {
    const sql = `
        SELECT
            d.detalle_id AS detail_id,
            d.descripcion AS detail
        FROM detalle d
        JOIN servicio_detalle sd ON d.detalle_id = sd.detalle_id
        JOIN servicio s ON sd.servicio_id = s.servicio_id
        WHERE s.tipo = 'paquete' AND s.servicio_id = ?
    `;
    const [rows]: any = await db.execute(sql, [id]);
    return rows;
}; 