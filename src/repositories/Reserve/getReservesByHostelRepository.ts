import db from '@/config/db';

export const getReservesByHostelRepository = async (hostel_id: number) => {
    const sql = `
        SELECT
            s.servicio_id AS room_id,
            e.experiencia_id AS hostel_id,
            s.nombre AS room_name,
            e.nombre AS hostel_name,
            s.capacidad AS max_people
        FROM reserva_habitacion rp
        JOIN servicio s ON rp.habitacion_id = s.servicio_id
        JOIN experiencia e ON s.experiencia_id = e.experiencia_id
        WHERE s.servicio_id = ?
    `;
    const [rows]: any = await db.execute(sql, [hostel_id]);
    return rows;
}; 