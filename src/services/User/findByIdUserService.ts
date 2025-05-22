import { User } from "../../models/User/User";
import { findByIdRepository } from "../../repositories/User/findByIdRepository";

export const findByIdUserService = async (id: string): Promise<User | null> => {
    const user = await findByIdRepository(id);
    return user;
}


