import { getPackageDetailsRepository } from "@/repositories/Package/getPackageDetailsRepository";
import { getPackageExperiencesRepository } from "@/repositories/Package/getPackageExperiencesRepository";
import { getPackageRepository } from "@/repositories/Package/getPackageRepository";

export const getPackageService = async (package_id: number) => {
    const info = await getPackageRepository(package_id);
    const details = await getPackageDetailsRepository(package_id);
    const experiences = await getPackageExperiencesRepository(package_id);
    const pack = { ...info, experiences: experiences, details: details }
    return pack
}; 