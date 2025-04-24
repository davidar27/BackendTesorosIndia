export interface Reviews {
    servicio_id?: number;
    finca_id: number;
    usuario_id: number;
    valoracion: number; // 1-10
    comentario?: string;
    infringe_normas?: boolean;
    fecha_creacion?: Date;
}