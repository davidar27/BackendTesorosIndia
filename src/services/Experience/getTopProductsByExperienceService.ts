import { getTopProductsByExperienceRepository } from '../../repositories/Experience/getTopProductsByExperienceRepository';

export async function getTopProductsByExperienceService(experiencie_id: number) {
    const productos = await getTopProductsByExperienceRepository(experiencie_id);
    return productos;
} 