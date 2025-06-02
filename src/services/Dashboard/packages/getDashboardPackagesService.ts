import { getDashboardPackagesRepository } from "@/repositories/Dashboard/packages/getDashboardPackagesRepository";

export const getDashboardPackagesService = async () => {
    return await getDashboardPackagesRepository();
}; 