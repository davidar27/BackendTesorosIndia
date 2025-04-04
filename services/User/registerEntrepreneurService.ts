import GenerateHash from "../../helpers/User/hashGenerator";
import { User } from "../../models/User/user";
import { createEntrepreneurRepository } from "../../repositories/User/createEntrepreneurRepository";

export const registerEntrepreneurService = async (newUser: User): Promise<void> => {    
    newUser.password = await GenerateHash(newUser.password);
    await createEntrepreneurRepository(newUser);
};
