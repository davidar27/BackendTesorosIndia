export interface Reserve {
    reserve_id?: number;
    room_id?: number;
    reserve_date?: string;
    state?: 'Pendiente' | 'Confirmada' | 'Cancelada';
}
