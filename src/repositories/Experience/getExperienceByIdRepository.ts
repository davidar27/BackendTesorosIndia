import db from '@/config/db';

export const getExperienceByIdRepository = async (experience_id: number) => {
    const query = `
        SELECT 
            experiencia_id AS experience_id,
            nombre AS name,
            descripcion AS description,
            ubicacion AS location,
            fecha_registro AS create_date,
            estado AS status,
            tipo AS type,
            imagen AS image,
            emprendedor_id AS entrepreneur_id,
            latitud AS lat,
            longitud AS lng,
            historia AS story
        FROM experiencia 
        WHERE experiencia_id = ?
    `;
    const values = [experience_id];
    try {
        const [rows]: any = await db.execute(query, values);
        return rows[0] || null;
    } catch (error) {
        console.error("Error en getExperienceByIdRepository:", error);
        throw new Error("Error al obtener contenido de la base de datos");
    }
};
