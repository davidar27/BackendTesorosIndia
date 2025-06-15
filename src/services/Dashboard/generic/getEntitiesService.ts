import { getEntitiesRepository } from "@/repositories/Dashboard/generic/getEntitiesRepository";
import { formatImageUrl } from "@/helpers/User/formatImageUrl";

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

