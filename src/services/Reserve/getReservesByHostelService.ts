import { getReservesByHostelRepository } from "@/repositories/Reserve/getReservesByHostelRepository";

export const getReservesByHostelService = async (hostel_id: number) => {
    return await getReservesByHostelRepository(hostel_id);
}; 