import { getReservesByUserRepository } from "@/repositories/Reserve/getReservesByUserRepository";

export const getReservesByUserService = async (id_user: number) => {
    return await getReservesByUserRepository(id_user);
}; 