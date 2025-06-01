import { findAllUserRepository } from "@/repositories/User/findAllUserRepository";



export const gettAllUsersServices =  async () => {
    return await findAllUserRepository();
}



