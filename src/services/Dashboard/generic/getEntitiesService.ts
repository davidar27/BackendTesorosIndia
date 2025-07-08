import { getEntitiesRepository } from "@/repositories/Dashboard/generic/getEntitiesRepository";

type EntityType = 'emprendedores' | 'experiencias' | 'categorias' | 'paquetes';

export const getEntitiesService = async (entityType: EntityType) => {
    try {
        const entities = await getEntitiesRepository(entityType);
        return entities.map(entity => ({
            ...entity,
            image: entity.image
        }));
    } catch (error: any) {
        throw new Error(`Failed to fetch ${entityType}: ${error.message}`);
    }
};

