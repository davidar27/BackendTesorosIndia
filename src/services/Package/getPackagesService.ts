import { getPackageDetailsRepository } from "@/repositories/Package/getPackageDetailsRepository";
import { getPackageExperiencesRepository } from "@/repositories/Package/getPackageExperiencesRepository";
import { getPackagesRepository } from "@/repositories/Package/getPackagesRepository";

export const getPackagesService = async () => {
    const packages = await getPackagesRepository();
    const packagesWithDetails = await Promise.all(packages.map(async (pack: any) => {
        const details = await getPackageDetailsRepository(pack.id);
        const experiences = await getPackageExperiencesRepository(pack.id);
        return { ...pack, experiences, details };
    }));
    return packagesWithDetails;
}; 