import { getExperienceMembersRepository } from "@/repositories/Experience/getExperienceMembersRepository";

export const getExperienceMembersService = async (experience_id: number) => {
    return await getExperienceMembersRepository(experience_id);
}; 