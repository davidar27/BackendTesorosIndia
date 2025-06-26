import { getPackageRepository } from "@/repositories/Package/getPackageRepository";

export const getPackageService = async () => {
    return await getPackageRepository();
}; 