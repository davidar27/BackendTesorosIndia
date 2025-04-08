import db from "../../config/db";
import { Farm } from "../../models/Farm/Farm";


export const getAllFarmRepository = async (): Promise<Farm> => {
    const sql = 'SELECT * FROM finca';
    const [rows] : any = await db.execute(sql);
    return rows;
};

