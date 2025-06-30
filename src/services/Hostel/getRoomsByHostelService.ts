import { getRoomsByHostelRepository } from "@/repositories/Hostel/getRoomsByHostelRepository";

export const getRoomsByHostelService = async (hostel_id: number) => {
    return await getRoomsByHostelRepository(hostel_id);
}; 