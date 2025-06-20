import { getDetailsRepository } from "@/repositories/Dashboard/packages/getDetailsRepository";

export const getDetailService = async () => {
    return await getDetailsRepository();
}; 