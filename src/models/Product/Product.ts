export interface Product {
    producto_id?: number;
    nombre: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    categoria?: string;
    experiencia_id?: number;
    fecha_registro?: Date;
    estado?: string;
    puntuacion?: number;
    imagen?: string;
}
