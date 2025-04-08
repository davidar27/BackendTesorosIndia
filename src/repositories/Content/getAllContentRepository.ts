import db from "../../config/db";
import { finca } from "../../models/Content/Content"


export const getAllContentRepository = async (): Promise<finca> => {
    const sql = 'SELECT * FROM finca';
    const [rows] : any = await db.execute(sql);
    return rows;
};

