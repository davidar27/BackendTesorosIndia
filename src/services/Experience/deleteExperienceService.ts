import { deleteExperienceRepository } from "@/repositories/Experience/deleteExperienceRepository";

export async function deleteExperienceService(id: number, entrepreneur_id: number): Promise<void> {
    await deleteExperienceRepository(id, entrepreneur_id);
}