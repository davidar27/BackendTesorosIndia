import { createContentRepository } from "../../repositories/Content/createContentRepository";

export const createContentService = async (contentData: any) => {
    return await createContentRepository(contentData);
};
