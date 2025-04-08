import { deleteContentRepository } from "../../repositories/Content/deleteContentRepository";

export async function deleteContentService(id: number, entrepreneur_id: number): Promise<void> {
    await deleteContentRepository(id, entrepreneur_id);
}