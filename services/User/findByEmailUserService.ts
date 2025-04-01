import { User } from "../../models/User/user";
import { findByEmailRepositoriy } from "../../repositories/User/findByEmailRepositoriy";


export const findByEmailUserService = async (email: string): Promise<User | null> => {
    const user = await findByEmailRepositoriy(email);
    return user;
}


