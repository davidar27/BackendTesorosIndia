import db from "@/config/db";

export const updateStatusExperienceRepository = async (experience_id: number, status: string) => {
    // Determinar el estado que deben tener los productos basado en el estado de la experiencia
    const productStatus = status === 'publicada' ? 'activo' : 'inactivo';
    
    const query = `
        UPDATE experiencia
        SET
            estado = ?
        WHERE experiencia_id = ?
    `;
    const values = [status, experience_id];
    const [result] = await db.query(query, values) as any;
    
    // Actualizar también el estado de los productos asociados a esta experiencia
    const updateProductsQuery = `
        UPDATE servicio
        SET
            estado = ?
        WHERE experiencia_id = ? AND tipo = 'producto'
    `;
    const productValues = [productStatus, experience_id];
    await db.query(updateProductsQuery, productValues) as any;
    
    // Actualizar el estado de las relaciones entre esta experiencia y los paquetes en experiencia_paquete
    const updatePackageRelationsQuery = `
        UPDATE experiencia_paquete
        SET
            estado = ?
        WHERE experiencia_id = ?
    `;
    await db.query(updatePackageRelationsQuery, [productStatus, experience_id]) as any;
    
    return result;
}