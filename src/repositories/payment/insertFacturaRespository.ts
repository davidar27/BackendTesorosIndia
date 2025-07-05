import db from "@/config/db";

export const insertFacturaRespository = async (factura: {
    usuario_id: number,
    total: number,
    estado: "pagada" | "cancelada",
    servicios: { servicio_id: number, cantidad: number, precio_unitario: number }[]
}) => {
    const [facturaResult] = await db.execute(
        `INSERT INTO factura (usuario_id, total, estado) VALUES (?, ?, ?)`,
        [factura.usuario_id, factura.total, factura.estado]
    );

    const facturaId = (facturaResult as any).insertId;

    const insertPromises = factura.servicios.map(s =>
        db.execute(
            `INSERT INTO factura_detalle (factura_id, servicio_id, cantidad, precio_unitario)
       VALUES (?, ?, ?, ?)`,
            [facturaId, s.servicio_id, s.cantidad, s.precio_unitario]
        )
    );

    await Promise.all(insertPromises);


    await db.execute(
        `INSERT INTO notificacion (usuario_id, mensaje, tipo)
         VALUES (?, ?, ?)`,
        [factura.usuario_id, 'Tu pago fue recibido exitosamente', 'Confirmación']
    );

};
