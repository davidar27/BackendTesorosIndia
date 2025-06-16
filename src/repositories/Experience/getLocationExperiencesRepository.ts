import db from '@/config/db';

export const getLocationExperiencesRepository = async () => {
    const sql = `
        SELECT e.nombre AS name, e.ubicacion AS location, e.tipo AS type, e.latitud AS lat, e.longitud AS lng
        FROM experiencia e;
    `;
    const [rows]: any = await db.execute(sql);
    return rows;
}; 