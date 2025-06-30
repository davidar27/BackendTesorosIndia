import { Reserve } from "@/models/Reserve/Reserve";
import { reserveRepository } from "@/repositories/Reserve/reserveRepository";

export const reserveService = async (reserve: Reserve) => {
    return await reserveRepository(reserve);
}; 