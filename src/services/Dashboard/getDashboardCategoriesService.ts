import { getDashboardCategoriesRepository } from "@/repositories/Dashboard/getDashboardCategoriesRepository";

export const getDashboardCategoriesService = async () => {
    return await getDashboardCategoriesRepository();
}; 