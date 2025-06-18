import db from '@/config/db';

export const getExperienceMembersRepository = async (experience_id: number) => {
    const sql = `
        SELECT
            u.nombre AS name,
            u.profesion AS profession,
            u.edad AS age,
            e.descripcion AS description
        FROM usuario u
        JOIN experiencia e ON u.experiencia_id = e.experiencia_id
        WHERE u.rol = 'emprendedor' AND u.estado = 'activo' AND e.experiencia_id = ?;
    `;
    const [rows]: any = await db.execute(sql, experience_id);
    return rows;
}; 