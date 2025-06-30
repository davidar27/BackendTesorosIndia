import { getReservesByUserRepository } from "@/repositories/Reserve/getReservesByUserRepository";

export const getReservesByUserService = async (user_id: number) => {
    return await getReservesByUserRepository(user_id);
}; 