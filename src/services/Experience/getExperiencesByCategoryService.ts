import { getExperiencesByCategoryRepository } from "@/repositories/Experience/getExperiencesByCategoryRepository";

export const getExperiencesByCategoryService = async (categoryId: number) => {
    return await getExperiencesByCategoryRepository(categoryId);
}; 