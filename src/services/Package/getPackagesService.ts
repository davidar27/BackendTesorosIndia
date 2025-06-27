import { getPackageDetailsRepository } from "@/repositories/Package/getPackageDetailsRepository";
import { getPackagesRepository } from "@/repositories/Package/getPackagesRepository";

export const getPackagesService = async () => {
    const packages = await getPackagesRepository();
    return packages.map(async (pack: any) => {
        const details = await getPackageDetailsRepository(pack.package_id);
        pack.details = details
        return pack
    })
}; 