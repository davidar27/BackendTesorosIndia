import { deleteContentRepository } from "../../repositories/Content/deleteContentRepository";

export async function deleteContentService(finca_id: number, emprendedor_id: number): Promise<void> {
    await deleteContentRepository(finca_id, emprendedor_id);
}