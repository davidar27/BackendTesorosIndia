import { getPackageDetailsRepository } from "@/repositories/Package/getPackageDetailsRepository";
import { getPackageExperiencesRepository } from "@/repositories/Package/getPackageExperiencesRepository";
import { getPackageRepository } from "@/repositories/Package/getPackageRepository";

export const getPackageService = async (id: number) => {
    const [info] = await getPackageRepository(id);
    const details = await getPackageDetailsRepository(id);
    const experiences = await getPackageExperiencesRepository(id);
    const pack = { ...info, experiences: experiences, details: details }
    return pack
}; 