import db from '@/config/db';

export const getMemberRepository = async (member_id: number) => {
    const sql = `
        SELECT 
            i.nombre AS name,
            i.descripcion AS descripcion,
            i.profesion AS profession,
            i.edad AS age,
            i.imagen AS image,
            i.integrante_id AS member_id,
            i.experiencia_id AS experience_id
        FROM integrantes i;
        WHERE i.integrante_id = ?
    `;
    const [rows]: any = await db.execute(sql, [member_id]);
    return rows;
}; 