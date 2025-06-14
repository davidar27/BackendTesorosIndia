import { getEntrepreneursRepository } from "@/repositories/User/getEntrepreneurRepository";

export const getEntrepreneurService = async () => {
    return await getEntrepreneursRepository();
}; 