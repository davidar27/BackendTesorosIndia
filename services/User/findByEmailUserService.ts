import user from "../../models/User/user";
import findByEmailRepositories from "../../repositories/User/findByEmailRepositories";


export const findByEmailUserService = async (email: string): Promise<user | null> => {
    const user = await findByEmailRepositories(email);
    return user;
}


