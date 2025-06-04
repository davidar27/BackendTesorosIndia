import { getDashboardExperiencesRepository } from "@/repositories/Dashboard/experience/getDashboardExperiencesRepository";

export const getDashboardExperiencesService = async () => {
    return await getDashboardExperiencesRepository();
}; 