import { getDashboardFarmsRepository } from "@/repositories/Dashboard/getDashboardFarmsRepository";

export const getDashboardFarmsService = async () => {
    return await getDashboardFarmsRepository();
}; 