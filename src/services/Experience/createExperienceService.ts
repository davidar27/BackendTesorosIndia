import { createExperienceRepository } from "@/repositories/Experience/createExperienceRepository";

export const createExperienceService = async (ExperienceData: any) => {
    return await createExperienceRepository(ExperienceData);
};
