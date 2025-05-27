import { User } from "../../models/User/User";
import { findByEmailRepository } from "../../repositories/User/findByEmailRepository";



export const findByEmailUserService = async (email: string): Promise<User | null> => {
    const user = await findByEmailRepository(email);
    return user;
}


