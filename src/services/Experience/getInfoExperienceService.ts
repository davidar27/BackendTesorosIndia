import { getInfoExperienceRepository } from "@/repositories/Experience/getInfoExperienceRepository";

export const getInfoExperienceService = async (id_experience:number) => {
    return await getInfoExperienceRepository(id_experience);
}; 