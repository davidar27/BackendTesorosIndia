import { getContentByIdRepository } from "../../repositories/Content/getContentByIdRepository";

export const getContentByIdService = async (finca_id: number, emprendedor_id: number) => {
    return await getContentByIdRepository(finca_id, emprendedor_id);
};