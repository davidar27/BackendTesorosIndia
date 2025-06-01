import db from '@/config/db';
import { Farm } from '@/models/Farm/Farm';


export const getAllNamesFarmRepository = async (): Promise<Farm> => {
    const sql = `SELECT nombre AS name_farm FROM finca`;
    const [rows]: any = await db.execute(sql);
    return rows;
};