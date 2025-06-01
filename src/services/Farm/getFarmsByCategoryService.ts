import { getFarmsByCategoryRepository } from "@/repositories/Farm/getFarmsByCategoryRepository";

export const getFarmsByCategoryService = async (categoryId: number) => {
    return await getFarmsByCategoryRepository(categoryId);
}; 