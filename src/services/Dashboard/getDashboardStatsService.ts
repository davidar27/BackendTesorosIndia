import { getDashboardStatsRepository } from "@/repositories/Dashboard/getDashboardStatsRepository";

export const getDashboardStatsService = async () => {
    return await getDashboardStatsRepository();
}; 