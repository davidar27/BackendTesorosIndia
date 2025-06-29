import { getHostelsRepository } from "@/repositories/Hostel/getHostelsRepository";

export const getHostelsService = async () => {
    return await getHostelsRepository();
}; 