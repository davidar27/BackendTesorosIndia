import db from '@/config/db';

export const getPackageExperiencesRepository = async (id: number) => {
    const sql = `
        SELECT
            e.experiencia_id AS experience_id,
            e.nombre AS name,
            s.servicio_id AS package_id
        FROM experiencia e
        JOIN experiencia_paquete ep ON e.experiencia_id = ep.experiencia_id
        JOIN servicio s ON ep.paquete_id = s.servicio_id
        WHERE s.tipo = 'paquete' AND s.servicio_id = ?
    `;
    const [rows]: any = await db.execute(sql, [id]);
    return rows;
}; 