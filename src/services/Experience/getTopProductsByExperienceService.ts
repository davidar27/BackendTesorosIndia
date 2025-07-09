import { getTopProductsByExperienceRepository } from '../../repositories/Experience/getTopProductsByExperienceRepository';

export async function getTopProductsByExperienceService(experiencia_id: number) {
    const productos = await getTopProductsByExperienceRepository(experiencia_id);
    return productos;
} 