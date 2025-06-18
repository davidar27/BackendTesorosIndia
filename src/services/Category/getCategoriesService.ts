import { getCategoriesRepository } from "@/repositories/Category/getCategoriesRepository";

export const getCategoriesService = async () => {
    return await getCategoriesRepository();
}; 