import { deleteFarmRepository } from "@/repositories/Farm/deleteFarmRepository";

export async function deleteFarmService(id: number, entrepreneur_id: number): Promise<void> {
    await deleteFarmRepository(id, entrepreneur_id);
}