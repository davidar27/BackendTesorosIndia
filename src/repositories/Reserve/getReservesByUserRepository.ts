import db from '@/config/db';

export const getReservesByUserRepository = async (user_id: number) => {
    const sql = `
        SELECT
            rp.reserva_id AS reserve_id,
            rp.fecha_reserva AS reserve_date,
            rp.estado AS state,
            rp.habitacion_id AS room_id,
            s.nombre AS room_name,
            s.imagen AS room_image,
            rp.usuario_id AS user_id
        FROM reserva_paquete rp
        JOIN servicio s ON rp.habitacion_id = s.servicio_id
        WHERE rp.usuario_id = ?
    `;
    const [rows]: any = await db.execute(sql, [user_id]);
    return rows;
}; 