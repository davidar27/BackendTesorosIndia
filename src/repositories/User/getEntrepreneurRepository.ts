import db from '@/config/db';

export const getEntrepreneursRepository = async () => {
    const sql = `
        SELECT u.usuario_id AS id, u.nombre AS name, u.edad AS age, u.profesion AS profession, u.imagen AS image
        FROM usuario u
        WHERE u.rol = 'emprendedor'
        AND u.estado = 'activo';
    `;
    const [rows]: any = await db.execute(sql);    
    return rows;
}; 