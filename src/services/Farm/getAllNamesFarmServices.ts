import { getAllNamesFarmRepository } from "@/repositories/Farm/getAllNamesFarmRepository";



export const getAllNamesFarmServices =  async () => {
    return await getAllNamesFarmRepository();
}



