import { getPackageDetailsRepository } from "@/repositories/Dashboard/packages/getPackageDetailsRepository";
import { getPackageExperiencesRepository } from "@/repositories/Dashboard/packages/getPackageExperiencesRepository";
import { getPackagesRepository } from "@/repositories/Dashboard/packages/getPackagesRepository";

export const getPackagesService = async () => {
    const packages = await getPackagesRepository();
    const packagesWithDetails = await Promise.all(packages.map(async (pack: any) => {
        const details = await getPackageDetailsRepository(pack.id);
        const experiences = await getPackageExperiencesRepository(pack.id);
        return { ...pack, experiences, details };
    }));
    return packagesWithDetails;
}; 