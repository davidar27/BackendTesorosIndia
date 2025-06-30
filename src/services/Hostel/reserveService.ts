import { Reserve } from "@/models/Reserve/Reserve";
import { reserveRepository } from "@/repositories/Hostel/reserveRepository";

export const reserveService = async (reserve: Reserve) => {
    return await reserveRepository(reserve);
}; 