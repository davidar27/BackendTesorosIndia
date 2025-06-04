import { updateExperienceRepository } from "@/repositories/Experience/updateExperienceRepository";

export const updateExperienceService = async (ExperienceData: any) => {
    return await updateExperienceRepository(ExperienceData);
};