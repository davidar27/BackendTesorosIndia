import { getContentByIdRepository } from "../../repositories/Content/getContentByIdRepository";

export const getContentByIdService = async (id: number, entrepreneur_id: number) => {
    return await getContentByIdRepository(id, entrepreneur_id);
};