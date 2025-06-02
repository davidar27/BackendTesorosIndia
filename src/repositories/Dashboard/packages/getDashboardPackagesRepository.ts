import db from '@/config/db';

export const getDashboardPackagesRepository = async () => {
    const sql = `
        SELECT 
            p.paquete_id AS id,
            p.nombre AS name,
            p.descripcion AS description,
            p.precio AS price,
            p.duracion AS duration,
            p.estado AS status,
            DATE_FORMAT(p.fecha_creacion, '%d/%m/%Y') AS created_at
        FROM paquete p
        ORDER BY p.fecha_creacion DESC
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 