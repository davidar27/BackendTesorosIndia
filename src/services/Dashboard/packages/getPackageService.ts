import { getPackageDetailsRepository } from "@/repositories/Dashboard/packages/getPackageDetailsRepository";
import { getPackageExperiencesRepository } from "@/repositories/Dashboard/packages/getPackageExperiencesRepository";
import { getPackageRepository } from "@/repositories/Dashboard/packages/getPackageRepository";

export const getPackageService = async (id: number) => {
    const [info] = await getPackageRepository(id);
    const details = await getPackageDetailsRepository(id);
    const experiences = await getPackageExperiencesRepository(id);
    const pack = { ...info, experiences: experiences, details: details }
    return pack
}; 