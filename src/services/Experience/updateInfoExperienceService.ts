import { updateInfoExperienceRepository } from "@/repositories/Experience/updateInfoExperienceRepository";

export const updateInfoExperienceService = async (ExperienceData: any) => {
    return await updateInfoExperienceRepository(ExperienceData);
};