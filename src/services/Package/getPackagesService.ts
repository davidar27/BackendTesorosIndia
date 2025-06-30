import { getPackageDetailsRepository } from "@/repositories/Package/getPackageDetailsRepository";
import { getPackagesRepository } from "@/repositories/Package/getPackagesRepository";

export const getPackagesService = async () => {
    const packages = await getPackagesRepository();
    const packagesWithDetails = await Promise.all(packages.map(async (pack: any) => {
        const details = await getPackageDetailsRepository(pack.id);
        return { ...pack, details };
    }));
    return packagesWithDetails;
}; 