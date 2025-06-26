import db from '@/config/db';

export const deleteMemberRepository = async (member_id: number) => {
    const sql = `
        DELETE FROM integrantes 
        WHERE integrante_id = ?
    `;
    const values = [member_id];
    const [result]: any = await db.execute(sql, values);
    return result;
};