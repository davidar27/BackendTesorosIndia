import db from '@/config/db';

export const getEntrepreneursRepository = async () => {
    const sql = `
        SELECT u.usuario_id AS id, u.nombre AS name, u.edad AS age, u.profesion AS role, u.imagen AS image
        FROM usuario u
        WHERE rol = 'emprendedor';
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 