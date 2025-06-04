import { getAllNamesExperienceRepository } from "@/repositories/Experience/getAllNamesExperienceRepository";



export const getAllNamesExperienceServices =  async () => {
    return await getAllNamesExperienceRepository();
}



