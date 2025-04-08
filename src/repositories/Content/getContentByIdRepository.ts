import db from "../../config/db";

export const getContentByIdRepository = async (id: number, entrepreneur_id: number) => {
    const query = `
        SELECT * FROM finca 
        WHERE finca_id = ? AND emprendedor_id = ?
    `;

    const values = [id, entrepreneur_id];

    try {
        const [rows]: any = await db.execute(query, values);
        return rows[0] || null;
    } catch (error) {
        console.error("Error en getContentByIdRepository:", error);
        throw new Error("Error al obtener contenido de la base de datos");
    }
};