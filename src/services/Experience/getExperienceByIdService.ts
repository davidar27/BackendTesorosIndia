import { getExperienceByIdRepository } from "@/repositories/Experience/getExperienceByIdRepository";

export const getExperienceByIdService = async (experience_id: number) => {
    return await getExperienceByIdRepository(experience_id);
};