import db from '@/config/db';
import { Member } from '@/models/Experience/Member';

export const updateMemberRepository = async (member: Member) => {
    const sql = `
        UPDATE integrantes 
        SET 
            nombre = ?,
            descripcion = ?,
            profesion = ?,
            edad = ?
        WHERE 
            integrante_id = ?
    `;
    const values = [
        member.name,
        member.description,
        member.profession,
        member.age,
        member.member_id
    ];

    const [result]: any = await db.execute(sql, values);
    return result;
};