import { getAllFarmRepository } from "../../repositories/Farm/getAllContentRepository";



export const getAllFarmServices =  async () => {
    return await getAllFarmRepository();
}



