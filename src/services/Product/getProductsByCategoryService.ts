import { getProductsByCategoryRepository } from "@/repositories/Product/getProductsByCategoryRepository";

export const getProductsByCategoryService = async (categoryId: number) => {
    return await getProductsByCategoryRepository(categoryId);
}; 