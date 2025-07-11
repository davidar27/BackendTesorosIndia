import db from '@/config/db';

export interface EntrepreneurReportData {
    incomeByExperience: any[];
    topProductsByExperience: any[];
    roomReservationsByExperience: any[];
    packagesSoldByExperience: any[];
    invoiceHistoryByExperience: any[];
}

export async function getEntrepreneurReportData(emprendedorId: number, experienciaId?: number): Promise<EntrepreneurReportData> {
    // 1. Total de ingresos por experiencia
    const [incomeByExperience] = await db.query(
        `SELECT 
            e.experiencia_id,
            e.nombre AS experiencia,
            SUM(fd.cantidad * fd.precio_unitario) AS total_ingresos
        FROM experiencia e
        JOIN servicio s ON s.experiencia_id = e.experiencia_id
        JOIN factura_detalle fd ON fd.servicio_id = s.servicio_id
        WHERE e.emprendedor_id = ?
        GROUP BY e.experiencia_id, e.nombre
        LIMIT 10;`,
        [emprendedorId]
    );

    // 2. Productos más vendidos por experiencia
    const [topProductsByExperience] = await db.query(
        `SELECT 
            s.servicio_id AS id,
            s.nombre AS producto,
            s.precio,
            SUM(fd.cantidad) AS total_vendidos,
            GROUP_CONCAT(DISTINCT c.nombre SEPARATOR ', ') AS categorias
        FROM servicio s
        JOIN factura_detalle fd ON fd.servicio_id = s.servicio_id
        LEFT JOIN servicio_categoria sc ON sc.servicio_id = s.servicio_id
        LEFT JOIN categoria c ON sc.categoria_id = c.categoria_id
        WHERE s.experiencia_id = ? AND s.tipo = 'producto'
        GROUP BY s.servicio_id, s.nombre, s.precio
        ORDER BY total_vendidos DESC
        LIMIT 10;`,
        [experienciaId || 0]
    );

    // 3. Reservas de habitaciones por experiencia
    const [roomReservationsByExperience] = await db.query(
        `SELECT 
            rh.reserva_id,
            rh.fecha_reserva,
            rh.estado,
            u.nombre AS cliente,
            s.nombre AS habitacion
        FROM reserva_habitacion rh
        JOIN usuario u ON rh.usuario_id = u.usuario_id
        JOIN servicio s ON rh.habitacion_id = s.servicio_id
        WHERE s.experiencia_id = ?
        ORDER BY rh.fecha_reserva DESC
        LIMIT 10;`,
        [experienciaId || 0]
    );

    // 4. Paquetes vendidos por experiencia
    const [packagesSoldByExperience] = await db.query(
        `SELECT 
            s.servicio_id,
            s.nombre AS paquete,
            COUNT(fd.factura_detalle_id) AS veces_vendido,
            SUM(fd.cantidad * fd.precio_unitario) AS ingresos_generados
        FROM servicio s
        JOIN factura_detalle fd ON fd.servicio_id = s.servicio_id
        WHERE s.experiencia_id = ? AND s.tipo = 'paquete'
        GROUP BY s.servicio_id, s.nombre
        LIMIT 5;`,
        [experienciaId || 0]
    );

    // 5. Historial de facturas con totales por cliente y experiencia
    const [invoiceHistoryByExperience] = await db.query(
        `SELECT 
            f.factura_id,
            f.fecha,
            f.total,
            f.estado,
            u.nombre AS cliente,
            e.nombre AS experiencia
        FROM factura f
        JOIN usuario u ON f.usuario_id = u.usuario_id
        JOIN factura_detalle fd ON fd.factura_id = f.factura_id
        JOIN servicio s ON fd.servicio_id = s.servicio_id
        JOIN experiencia e ON s.experiencia_id = e.experiencia_id
        WHERE e.emprendedor_id = ?
        ORDER BY f.fecha DESC
        LIMIT 10;`,
        [emprendedorId]
    );

    return {
        incomeByExperience: incomeByExperience as any[],
        topProductsByExperience: topProductsByExperience as any[],
        roomReservationsByExperience: roomReservationsByExperience as any[],
        packagesSoldByExperience: packagesSoldByExperience as any[],
        invoiceHistoryByExperience: invoiceHistoryByExperience as any[],
    };
} 