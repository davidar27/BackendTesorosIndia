import db from '@/config/db';

interface Review {
    review_id: number;
    userId: number;
    user_name: string;
    user_image: string;
    review_date: string;
    rating: number | null;
    comment: string;
    responses: Review[];
}

export const getReviewsByProduct = async (product_id: number): Promise<Review[]> => {
    const sql = `
        SELECT 
            v.valoracion_id AS review_id,
            u.usuario_id AS userId,
            u.nombre AS user_name,
            u.imagen AS user_image,
            DATE_FORMAT(CONVERT_TZ(v.fecha_creacion, '+00:00', '-05:00'), '%d/%m/%Y') AS review_date,
            v.puntuacion as rating,
            v.parent_id AS parent_review,
            v.comentario AS comment
        FROM valoracion v
        JOIN usuario u ON v.usuario_id = u.usuario_id
        WHERE v.experiencia_id = ?
        ORDER BY v.fecha_creacion DESC;
    `;
    
    const [rows]: any = await db.execute(sql, [product_id]);
    
    const reviewsMap = new Map<number, Review>();
    const mainReviews: Review[] = [];
    
    rows.forEach((row: any) => {
        const review: Review = {
            review_id: row.review_id,
            userId: row.userId,
            user_name: row.user_name,
            user_image: row.user_image,
            review_date: row.review_date,
            rating: row.rating,
            comment: row.comment,
            responses: []
        };
        
        reviewsMap.set(row.review_id, review);
    });
    
    rows.forEach((row: any) => {
        const review = reviewsMap.get(row.review_id)!;
        
        if (row.parent_review === null) {
            mainReviews.push(review);
        } else {
            const parentReview = reviewsMap.get(row.parent_review);
            if (parentReview) {
                parentReview.responses.push(review);
            }
        }
    });
    
    return mainReviews;
}; 