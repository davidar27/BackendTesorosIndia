import { getDashboardCategoriesRepository } from "@/repositories/Dashboard/category/getDashboardCategoriesRepository";

export const getDashboardCategoriesService = async () => {
    return await getDashboardCategoriesRepository();
}; 