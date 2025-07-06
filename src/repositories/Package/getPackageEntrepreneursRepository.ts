import db from '@/config/db';

export const getPackageEntrepreneursRepository = async (package_id: number) => {
    const sql = `
        SELECT 
            u.usuario_id AS entrepreneur_id,
            e.experiencia_id AS experience_id,
            s.servicio_id AS package_id
        FROM servicio s
        JOIN experiencia_paquete ep ON s.servicio_id = ep.paquete_id
        JOIN experiencia e ON ep.experiencia_id = e.experiencia_id
        JOIN usuario u ON e.emprendedor_id = u.usuario_id
        WHERE s.servicio_id = ?
    `;
    const [rows]: any = await db.execute(sql, [package_id]);
    return rows;
}; 