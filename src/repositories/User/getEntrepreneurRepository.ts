import db from '@/config/db';

export const getCategoriesRepository = async () => {
    const sql = `
        SELECT u.nombre, u.edad, u.profesion
        FROM usuario u
        WHERE rol = 'emprendedor';
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 