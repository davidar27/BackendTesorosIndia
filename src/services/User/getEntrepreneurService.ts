import { getEntrepreneursRepository } from "@/repositories/Dashboard/entreprenaur/getEntrepreneursRepository";

export const getEntrepreneurService = async () => {
    return await getEntrepreneursRepository();
}; 