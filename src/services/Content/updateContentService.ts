import { updateContentRepository } from "../../repositories/Content/updateContentRepository";

export const updateContentService = async (contentData: any) => {
    return await updateContentRepository(contentData);
};