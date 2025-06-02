import { getDashboardFarmsRepository } from "@/repositories/Dashboard/farm/getDashboardFarmsRepository";

export const getDashboardFarmsService = async () => {
    return await getDashboardFarmsRepository();
}; 