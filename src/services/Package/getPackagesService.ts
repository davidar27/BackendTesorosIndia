import { getPackagesRepository } from "@/repositories/Package/getPackagesRepository";

export const getPackagesService = async () => {
    return await getPackagesRepository();
}; 