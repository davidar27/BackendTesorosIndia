import db from '@/config/db';

export const findUserByRoomRepository = async (room_id: number) => {
    const sql = `
        SELECT
            u.usuario_id AS user_id,
            u.correo AS email,
            u.rol AS role,
            u.nombre AS name,
            u.telefono AS phone,
            u.imagen AS image,
            u.direccion AS address,
            u.estado AS state,
            e.experiencia_id AS hostel_id,
            s.servicio_id AS room_id
        FROM usuario u
        LEFT JOIN experiencia e ON u.usuario_id = e.emprendedor_id
        LEFT JOIN servicio s ON s.experiencia_id = e.experiencia_id
        WHERE u.rol = "emprendedor"
        AND s.servicio_id = ?;
    `;

    try {
        const [rows]: any = await db.execute(sql, [room_id]);
        if (rows.length === 0) return null;

        const row = rows[0];
        return row
    } catch (error) {
        throw new Error(`Error al buscar usuario por ID: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
}; 