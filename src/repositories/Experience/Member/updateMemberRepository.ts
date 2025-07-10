import db from '@/config/db';
import { Member } from '@/models/Experience/Member';

export const updateMemberRepository = async (member: Member) => {
    const sql = `
        UPDATE integrantes 
        SET 
            nombre = ?,
            descripcion = ?,
            profesion = ?,
            imagen = ?,
            edad = ?
        WHERE 
            integrante_id = ?
    `;
    const values = [
        member.name,
        member.description,
        member.profession,
        member.image,
        member.age,
        member.memberId
    ];

    const [result]: any = await db.execute(sql, values);

    // Get the updated member with its data
    const updatedMemberSql = `
        SELECT 
        integrante_id as memberId, 
        nombre as name, 
        descripcion as description, 
        profesion as profession, 
        edad as age, 
        experiencia_id as experience_id, 
        imagen as image
        FROM integrantes 
        WHERE integrante_id = ?
    `;
    const [updatedMember]: any = await db.execute(updatedMemberSql, [member.memberId]);

    return updatedMember[0];
};