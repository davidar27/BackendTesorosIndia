import db from '@/config/db';

export const createFactura = async (total: number, estado: string, usuario_id: number) => {
    const [result]: any = await db.query(
        `INSERT INTO factura (total, estado, usuario_id) VALUES (?, ?, ?)`,
        [total, estado, usuario_id]
    );
    return result.insertId;
};

export const createFacturaDetalle = async (
    factura_id: number,
    servicio_id: number,
    cantidad: number,
    precio_unitario: number
) => {
    await db.query(
        `INSERT INTO factura_detalle (factura_id, servicio_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)`,
        [factura_id, servicio_id, cantidad, precio_unitario]
    );
};