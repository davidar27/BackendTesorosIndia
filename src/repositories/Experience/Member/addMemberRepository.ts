import db from '@/config/db';
import { Member } from '@/models/Experience/Member';

export const addMemberRepository = async (member: Member) => {
    const sql = `
        INSERT INTO integrantes 
            (nombre, descripcion, profesion, edad, experiencia_id, imagen) 
        VALUES 
            (?, ?, ?, ?, ?, ?)
    `;
    const values = [member.name, member.description, member.profession, member.age, member.experience_id, member.image];
    const [result]: any = await db.execute(sql, values);
    
    const createdMemberSql = `
        SELECT integrante_id as memberId, 
        nombre as name, 
        descripcion as description, 
        profesion as profession, 
        edad as age, 
        experiencia_id as experience_id, 
        imagen as image
        FROM integrantes 
        WHERE integrante_id = ?
    `;
    const [createdMember]: any = await db.execute(createdMemberSql, [result.insertId]);
    
    return createdMember[0];
};