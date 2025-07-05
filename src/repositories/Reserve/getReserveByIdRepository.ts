
import db from '@/config/db';
import { Reserve } from '@/models/Reserve/Reserve';

export const getReserveByIdRepository = async (reserve_id: number): Promise<Reserve> => {
    const sql = `
        SELECT
            reserva_id AS reserve_id,
            fecha_reserva AS reserve_date,
            estado AS state,
            habitacion_id AS room_id,
            usuario_id AS user_id
        FROM reserva_paquete
        WHERE reserva_id = ?
    `;
    const [rows]: any = await db.execute(sql, [reserve_id]);
    return rows;
}; 