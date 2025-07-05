import db from '@/config/db';

export const cancelReserveRepository = async (reserve_id: number, user_id: number) => {
    const sql = `
        UPDATE reserva_paquete SET estado = 'Cancelada'
        WHERE reserva_id = ? AND usuario_id = ?
    `;
    const [rows]: any = await db.execute(sql, [reserve_id, user_id]);
    return rows;
}; 