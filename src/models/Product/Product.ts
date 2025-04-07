export interface Product {
    producto_id?: number;
    nombre: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    categoria_id?: number;
    emprendedor_id: number;
    fecha_creacion?: Date;
    estado?: string;
}
