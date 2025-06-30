export interface Reserve {
    reserve_id?: number;
    hostel_id?: number;
    reserve_date?: string;
    state?: 'Pendiente' | 'Confirmada' | 'Cancelada';
}
