import db from '@/config/db';
import { Review } from '@/models/Review/Review';

export const addReviewRepository = async (reviewsData: Review) => {
    const { rating, user_id, entity_id, review, type, parent_id } = reviewsData;
    
    // Validar que el tipo sea válido
    if (!type || !['experiencia', 'producto'].includes(type)) {
        throw new Error("Tipo de entidad inválido. Debe ser 'experiencia' o 'producto'");
    }
    
    // Validar que la entidad existe antes de insertar la review
    const entityColumn = type === 'producto' ? 'producto_id' : 'experiencia_id';
    const entityTable = type === 'producto' ? 'producto' : 'experiencia';
    
    // Verificar que la entidad existe
    const checkEntityQuery = `SELECT ${entityColumn} FROM ${entityTable} WHERE ${entityColumn} = ?`;
    const [entityExists]: any = await db.execute(checkEntityQuery, [entity_id]);
    
    if (!entityExists || entityExists.length === 0) {
        throw new Error(`${type} con ID ${entity_id} no existe`);
    }
    
    // Si es una respuesta (parent_id existe), verificar que el comentario padre existe
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
        throw new Error("Error al insertar valoración en la base de datos");
    }
};