import GenerateHash from "../../helpers/User/hashGenerator";
import { User } from "../../models/User/User"; 
import { createUserRepository } from "../../repositories/User/createUserRepository";

export const registerUserService = async (newUser: User): Promise<User> => {    
    newUser.password = await GenerateHash(newUser.password);
    return await createUserRepository(newUser);
}

