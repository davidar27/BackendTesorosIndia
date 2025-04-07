import { createContentRepository } from "../../repositories/Content/createContentRepository";

export const createContentService = async (contentData: any) => {
    contentData.images = contentData.images || null;
    contentData.videos = contentData.videos || null;

    return await createContentRepository(contentData);
};
