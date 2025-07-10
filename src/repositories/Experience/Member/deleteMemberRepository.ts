import db from '@/config/db';

export const deleteMemberRepository = async (memberId: number) => {    
    const sql = `
        DELETE FROM integrantes 
        WHERE integrante_id = ?
    `;
    const values = [memberId];
    const [result]: any = await db.execute(sql, values);
    return result;
};