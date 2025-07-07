import db from '@/config/db';
import { Review } from '@/models/Review/Review';

export const addReviewRepository = async (reviewsData: Review) => {
    const { rating, user_id, entity_id, review, type, parent_id } = reviewsData;
        
    if (!type || !['experiencia', 'producto'].includes(type)) {
        throw new Error("Tipo de entidad inválido. Debe ser 'experiencia' o 'producto'");
    }
    
    const entityColumn = type === 'producto' ? 'producto_id' : 'experiencia_id';
    const entityTable = type === 'producto' ? 'servicio' : 'experiencia';
    const entityCondition = type === 'producto' ? 'servicio_id = ? AND tipo = "producto"' : 'experiencia_id = ?';
    const selectColumn = type === 'producto' ? 'servicio_id' : 'experiencia_id';
    
    const checkEntityQuery = `SELECT ${selectColumn} FROM ${entityTable} WHERE ${entityCondition}`;    
    const [entityExists]: any = await db.execute(checkEntityQuery, [entity_id]);
    
    if (!entityExists || entityExists.length === 0) {
        throw new Error(`${type} con ID ${entity_id} no existe`);
    }
    
    if (parent_id) {
        const checkParentQuery = `SELECT valoracion_id FROM valoracion WHERE valoracion_id = ?`;
        
        const [parentExists]: any = await db.execute(checkParentQuery, [parent_id]);
        
        if (!parentExists || parentExists.length === 0) {
            throw new Error("El comentario padre no existe");
        }
    }
    
    const query = `
        INSERT INTO valoracion (
            puntuacion, 
            usuario_id, 
            ${entityColumn}, 
            comentario,
            parent_id
        ) VALUES (?, ?, ?, ?, ?)
    `;
    
    const values = [
        rating,
        user_id,
        entity_id,
        review || null,
        parent_id || null
    ];
    
    try {
        const [result]: any = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error("Error en addReviewRepository:", error);
        console.error("Error completo:", JSON.stringify(error, null, 2));
        throw new Error("Error al insertar valoración en la base de datos");
    }
};