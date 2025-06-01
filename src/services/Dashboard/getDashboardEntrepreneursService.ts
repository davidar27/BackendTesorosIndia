import { getDashboardEntrepreneursRepository } from "@/repositories/Dashboard/getDashboardEntrepreneursRepository";

export const getDashboardEntrepreneursService = async () => {
    return await getDashboardEntrepreneursRepository();
}; 