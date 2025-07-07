import { updateStatusExperienceRepository } from "@/repositories/Experience/updateStatusExperienceRepository";



export const updateStatusExperienceService = async (experience_id: number, status: string) => {
    return await updateStatusExperienceRepository(experience_id, status);
}