import { updateFarmRepository } from "@/repositories/Farm/updateFarmRepository";

export const updateFarmService = async (FarmData: any) => {
    return await updateFarmRepository(FarmData);
};