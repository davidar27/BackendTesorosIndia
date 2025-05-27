import db from "../../config/db";
import { Farm } from "../../models/Farm/Farm";


export const getAllFarmRepository = async (): Promise<Farm> => {
    const sql = `SELECT 
    finca_id AS id,
    nombre AS name,
	descripcion AS description,
    ubicacion AS location,
    fecha_creacion AS created_at,
    estado AS status,
    emprendedor_id AS emprendedor_id
    FROM finca;`;
    const [rows]: any = await db.execute(sql);
    return rows;
};