import db from '@/config/db';

export const getReservesByHostelRepository = async (hostel_id: number) => {
    const sql = `
        SELECT
            rp.reserva_id AS reserve_id,
            rp.fecha_reserva AS reserve_date,
            rp.estado AS state,
            rp.habitacion_id AS room_id,
            s.nombre AS room_name,
            s.imagen AS room_image,
            rp.usuario_id AS user_id,
            u.nombre AS user_name,
            u.correo AS user_email,
            u.telefono AS user_phone
        FROM experiencia e 
        JOIN servicio s ON e.experiencia_id = s.experiencia_id
        JOIN reserva_paquete rp ON s.servicio_id = rp.habitacion_id
        JOIN usuario u ON rp.usuario_id = u.usuario_id
        WHERE s.estado = 'activo' AND e.experiencia_id = ?
    `;
    const [rows]: any = await db.execute(sql, [hostel_id]);
    return rows;
}; 