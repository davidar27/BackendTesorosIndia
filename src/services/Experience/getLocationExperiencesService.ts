import { getLocationExperiencesRepository } from "@/repositories/Experience/getLocationExperiencesRepository";

export const getLocationExperiencesService = async () => {
    return await getLocationExperiencesRepository();
}; 