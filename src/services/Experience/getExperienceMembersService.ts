import { getExperienceMembersRepository } from "@/repositories/Experience/getExperienceMembersRepository";

export const getExperienceMembersService = async () => {
    return await getExperienceMembersRepository();
}; 