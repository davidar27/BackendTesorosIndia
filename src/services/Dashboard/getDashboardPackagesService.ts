import { getDashboardPackagesRepository } from "@/repositories/Dashboard/getDashboardPackagesRepository";

export const getDashboardPackagesService = async () => {
    return await getDashboardPackagesRepository();
}; 