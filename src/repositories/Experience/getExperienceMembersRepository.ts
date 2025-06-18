import db from '@/config/db';

export const getExperienceMembersRepository = async () => {
    // en proceso
    const sql = ``;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 