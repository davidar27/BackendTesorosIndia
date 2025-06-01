import { getMyFarmRepository } from "@/repositories/Farm/getMyFarmRepository";

export const getMyFarmService = async (emprendedorId: number) => {
    return await getMyFarmRepository(emprendedorId);
}; 