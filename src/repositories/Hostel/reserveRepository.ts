import db from '@/config/db';
import { Reserve } from '@/models/Reserve/Reserve';

export const reserveRepository = async (reserve: Reserve) => {
    const sql = `
        INSERT INTO reserva_servicio
        (fecha_reserva, estado, hostal_id)
        VALUES(?, ?, ?)
    `;
    const values = [reserve.reserve_date, reserve.state, reserve.hostel_id]
    const [rows]: any = await db.execute(sql, values);
    return rows;
}; 