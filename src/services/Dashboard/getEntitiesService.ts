import { getEntitiesRepository } from "@/repositories/Dashboard/getEntitiesRepository";

type EntityType = 'emprendedores' | 'experiencias' | 'categorias' | 'paquetes';

export const getEntitiesService = async (entityType: EntityType) => {
    try {
        const entities = await getEntitiesRepository(entityType);
        return entities.map(entity => ({
            ...entity,
            image: entity.image ? formatImageUrl(entity.image) : null
        }));
    } catch (error: any) {
        throw new Error(`Failed to fetch ${entityType}: ${error.message}`);
    }
};

// Helper para formatear URLs de imágenes
const formatImageUrl = (imagePath: string): string => {
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
        return imagePath;
    }
    return `/images/${imagePath}`;
};