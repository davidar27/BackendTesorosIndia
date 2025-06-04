import { getAllExperienceRepository } from "@/repositories/Experience/getAllExperienceRepository";



export const getAllExperienceServices =  async () => {
    return await getAllExperienceRepository();
}



