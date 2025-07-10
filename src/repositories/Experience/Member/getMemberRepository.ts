import db from '@/config/db';
import { Member } from '@/models/Experience/Member';

export const getMemberRepository = async (memberId: number) => {
    const sql = `
        SELECT 
            i.nombre AS name,
            i.descripcion AS descripcion,
            i.profesion AS profession,
            i.edad AS age,
            i.imagen AS image,
            i.integrante_id AS memberId,
            i.experiencia_id AS experience_id
        FROM integrantes i
        WHERE i.integrante_id = ?
    `;
    const [rows]: any = await db.execute(sql, [memberId]);    
    return rows[0];
}; 