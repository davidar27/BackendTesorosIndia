import { getProductsExperienceRepository } from "@/repositories/Experience/getProductsExperienceRepository";

export const getProductsExperienceService = async (experience_id: number) => {
    return await getProductsExperienceRepository(experience_id);
}; 