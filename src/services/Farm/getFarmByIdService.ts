import { getFarmByIdRepository } from "../../repositories/Farm/getFarmByIdRepository";

export const getFarmByIdService = async (id: number, entrepreneur_id: number) => {
    return await getFarmByIdRepository(id, entrepreneur_id);
};