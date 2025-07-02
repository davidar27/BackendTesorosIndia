import db from '@/config/db';

export const updateInfoExperienceRepository = async (ExperienceData: any) => {
    const { experience_id, description, location, story, image, entrepreneur_id, lat, lng } = ExperienceData;

    const query = `
        UPDATE experiencia 
        SET
            descripcion = ?, 
            ubicacion = ?, 
            historia = ?, 
            imagen = ?,
            latitud = ?,
            longitud = ?
        WHERE experiencia_id = ? AND emprendedor_id = ?
    `;

    const values = [
        description,
        location,
        story,
        image,
        lat,
        lng,
        experience_id,
        entrepreneur_id
    ];

    try {
        const [result]: any = await db.execute(query, values);
        if (result.affectedRows === 0) {
            return "No se encontró el contenido o no tienes permisos";
        }
        return "Experiencia actualizada con exito";
    } catch (error) {
        console.error("Error en updateInfoExperienceRepository:", error);
        throw new Error("Error al actualizar contenido en la base de datos");
    }
};
