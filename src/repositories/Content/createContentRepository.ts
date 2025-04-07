import db from "../../config/db";

export const createContentRepository = async (contentData: any) => {
    const { name, description, location, images, videos, entrepreneur_id } = contentData;


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
        console.error("⚠️ Error en createContentRepository:");
        console.error("Mensaje de error:", error.message);
        if (error.sql) {
            console.error("Consulta SQL fallida:", error.sql);
        }
        if (error.sqlMessage) {
            console.error("Mensaje SQL:", error.sqlMessage);
        }
        if (error.code) {
            console.error("Código de error:", error.code);
        }
        if (error.errno) {
            console.error("Número de error:", error.errno);
        }
        if (error.sqlState) {
            console.error("Estado SQL:", error.sqlState);
        }

        throw new Error("Error al insertar contenido en la base de datos");
    }

};
