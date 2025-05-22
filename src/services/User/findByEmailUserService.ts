import { User } from "../../models/User/User";
import { findByEmailRepositoriy } from "../../repositories/User/findByEmailRepository";


export const findByEmailUserService = async (email: string): Promise<User | null> => {
    const user = await findByEmailRepositoriy(email);
    return user;
}


