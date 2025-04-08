import { createFarmRepository } from "../../repositories/Farm/createFarmRepository";

export const createFarmService = async (FarmData: any) => {
    return await createFarmRepository(FarmData);
};
