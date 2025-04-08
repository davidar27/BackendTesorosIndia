import db from "../../config/db";

export const createFarmRepository = async (FarmData: any) => {
    const { name, description, location, images, videos, entrepreneur_id } = FarmData;


    const query = `
        INSERT INTO finca (nombre, descripcion, ubicacion, imagenes, videos, emprendedor_id) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        description,
        location,
        images || null,
        videos || null,
        entrepreneur_id
    ];

    try {

        const [result] = await db.execute(query, values);
        return result;

    } catch (error: any) {
        throw new Error("Error al insertar contenido en la base de datos");
    }

};
