export interface Review {
    review_id?: number;
    type?: 'experiencia' | 'producto';
    entity_id?: number;
    user_id: number;
    rating: number;
    review?: string;
    breaks_rules?: boolean;
    create_date?: Date;
}