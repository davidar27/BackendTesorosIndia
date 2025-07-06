import db from '@/config/db';

export const createFactura = async (total: number, estado: string, usuario_id: number, id: number
) => {
    const [result]: any = await db.query(
        `INSERT INTO factura (total, estado, usuario_id, paymentId) VALUES (?, ?, ?, ?)`,
        [total, estado, usuario_id,id]
    );
    return result.insertId;
};

export const createFacturaDetalle = async (
    factura_id: number,
    servicio_id: number,
    cantidad: number,
    precio_unitario: number,
) => {
    await db.query(
        `INSERT INTO factura_detalle (factura_id, servicio_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)`,
        [factura_id, servicio_id, cantidad, precio_unitario]
    );
};

export const findFacturaByPaymentId = async (id: number) => {
    const [rows]: any = await db.query(
        `SELECT id FROM factura WHERE paymentId = ?`,
        [id]
    );
    return rows.length > 0 ? rows[0].id : null;
};