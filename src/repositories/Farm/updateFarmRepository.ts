import db from "../../config/db";

export const updateFarmRepository = async (FarmData: any) => {
    const { id, name, description, location, images, videos, entrepreneur_id } = FarmData;

    const query = `
        UPDATE finca 
        SET nombre = ?, 
            descripcion = ?, 
            ubicacion = ?, 
            imagenes = ?, 
            videos = ?,
            fecha_creacion = CURRENT_TIMESTAMP
        WHERE finca_id = ? AND emprendedor_id = ?
    `;

    const values = [
        name,
        description,
        location,
        images,
        videos,
        id,
        entrepreneur_id
    ];



    
    

    try {
        const [result]: any = await db.execute(query, values);
        
        if (result.affectedRows === 0) {
            throw new Error("No se encontró el contenido o no tienes permisos");
        }
        
        return result;
    } catch (error) {
        console.error("Error en updateFarmRepository:", error);
        throw new Error("Error al actualizar contenido en la base de datos");
    }
};