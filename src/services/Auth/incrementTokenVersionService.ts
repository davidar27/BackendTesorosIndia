import { incrementTokenVersionRepository } from "@/repositories/Auth/incrementTokenVersionRepository";

export const incrementTokenVersionService = async (userId: number): Promise<void> => {
    await incrementTokenVersionRepository(userId);
}; 