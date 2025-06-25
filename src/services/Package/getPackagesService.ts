import { getPacksRepository } from "@/repositories/Package/getPackagesRepository";

export const getPacksService = async () => {
    return await getPacksRepository();
}; 