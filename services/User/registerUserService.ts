import user from "../../models/User/user";
import createUserRepositories from "../../repositories/User/createUserRepositories";
import GenerateHash from "../../helpers/User/hashGenerator";

export const registerUserService = async (user: user): Promise<user> => {
    user.password = await GenerateHash(user.password);
    return await createUserRepositories(user);
}

