import db from '@/config/db';
import { Member } from '@/models/Experience/Member';

export const addMemberRepository = async (member: Member) => {
    const sql = `
        INSERT INTO integrantes 
            (nombre, descripcion, profesion, edad, experiencia_id) 
        VALUES 
            (?, ?, ?, ?, ?)
    `;
    const values = [member.name, member.description, member.profession, member.age, member.experience_id];
    const [result]: any = await db.execute(sql, values);
    return result;
};