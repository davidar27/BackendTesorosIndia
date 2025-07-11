import db from '@/config/db';

export const getLocationExperiencesRepository = async () => {
    const sql = `
        SELECT 
        e.experiencia_id as experienceId,
        e.nombre AS name, 
        e.ubicacion AS location, 
        e.tipo AS type, 
        e.latitud AS lat, 
        e.longitud AS lng,
        e.imagen AS image
        FROM experiencia e
        WHERE e.estado = 'publicada';
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 