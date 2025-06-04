import { getMyExperienceRepository } from "@/repositories/Experience/getMyExperienceRepository";

export const getMyExperienceService = async (emprendedorId: number) => {
    return await getMyExperienceRepository(emprendedorId);
}; 