import db from '@/config/db';

export const getExperienceMembersRepository = async (experience_id: number) => {
    const sql = `
        SELECT
            i.nombre AS name,
            i.profesion AS profession,
            i.edad AS age,
            i.descripcion AS description,
            i.imagen AS image
        FROM integrantes i
        JOIN experiencia e ON i.experiencia_id = e.experiencia_id
        WHERE e.experiencia_id = ?;
    `;
    const [rows]: any = await db.execute(sql, [experience_id]);
    return rows;
}; 