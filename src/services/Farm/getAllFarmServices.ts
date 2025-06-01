import { getAllFarmRepository } from "@/repositories/Farm/getAllFarmRepository";



export const getAllFarmServices =  async () => {
    return await getAllFarmRepository();
}



