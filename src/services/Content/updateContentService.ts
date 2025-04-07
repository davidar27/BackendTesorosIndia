import { updateContentRepository } from "../../repositories/Content/updateContentRepository";

export const updateContentService = async (contentData: any) => {
    contentData.images = contentData.images || null;
    contentData.videos = contentData.videos || null;
    contentData.description = contentData.description || "Sin descripción";
    contentData.ubicacion = contentData.ubicacion || null;

    return await updateContentRepository(contentData);
};