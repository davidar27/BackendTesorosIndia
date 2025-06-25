import db from '@/config/db';
import { Product } from '@/models/Product/Product';

export async function createProductRepository(product: Product): Promise<number> {
    // Verificar si el producto ya existe
    const checkSql = `SELECT servicio_id FROM servicio WHERE nombre = ? AND emprendedor_id = ? AND tipo = 'producto'`;
    const checkValues = [product.nombre, product.emprendedor_id];

    const [existing]: any = await db.execute(checkSql, checkValues);

    if (existing.length > 0) {
        throw new Error("Este producto ya ha sido registrado por el emprendedor.");
    }

    // Obtener experiencie_id desde emprendedor_id
    const fincaSql = `SELECT experiencie_id FROM experiencia WHERE usuario_id = ?`;
    const [fincaResult]: any = await db.execute(fincaSql, [product.emprendedor_id]);

    if (fincaResult.length === 0) {
        throw new Error("No se encontró una experiencia asociada a este emprendedor.");
    }

    const experiencie_id = fincaResult[0].experiencie_id;

    // Llamar al Stored Procedure
    const spCall = `CALL sp_crear_producto(?, ?, ?, ?)`;
    const spValues = [
        product.nombre,
        product.descripcion || null,
        product.precio || null,
        experiencie_id
    ];

    const [spResult]: any = await db.execute(spCall, spValues);

    // Obtenemos el ID insertado desde el SP si lo retorna (depende de cómo definiste el SP)
    const insertedId = spResult[0]?.[0]?.servicio_id; // Asegúrate que el SP retorna el ID como SELECT LAST_INSERT_ID() AS servicio_id;
    return insertedId;
}
