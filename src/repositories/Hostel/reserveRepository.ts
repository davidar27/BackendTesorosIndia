import db from '@/config/db';
import { Reserve } from '@/models/Reserve/Reserve';

export const reserveRepository = async (reserve: Reserve) => {
    const sql = `
        INSERT INTO reserva_servicio
        (fecha_reserva, estado, habitacion_id)
        VALUES(?, ?, ?)
    `;
    const values = [reserve.reserve_date, reserve.state, reserve.room_id]
    const [rows]: any = await db.execute(sql, values);
    return rows;
}; 