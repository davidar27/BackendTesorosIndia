import { getAllContentRepository } from "../../repositories/Content/getAllContentRepository";



export const gettAllContentServices =  async () => {
    return await getAllContentRepository();
}



