import { getExperienceByIdRepository } from "@/repositories/Experience/getExperienceByIdRepository";

export const getExperienceByIdService = async (id: number, entrepreneur_id: number) => {
    return await getExperienceByIdRepository(id, entrepreneur_id);
};