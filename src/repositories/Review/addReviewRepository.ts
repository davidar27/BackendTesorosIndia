import db from '@/config/db';
import { Review } from '@/models/Review/Review';

export const addReviewRepository = async (reviewsData: Review) => {
    const { rating, user_id, entity_id, review, type, parent_id } = reviewsData;
    const entityColumn = type === 'producto' ? 'producto_id' : 'experiencia_id';
    const query = `
        INSERT INTO valoraciones (
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