import GenerateHash from "../../helpers/User/hashGenerator";
import { Farm } from "../../models/Farm/Farm";
import { User } from "../../models/User/User";
import createEntrepreneurRepository from "../../repositories/User/createEntrepreneurRepository";

export const registerEntrepreneurService = async (newUser: User, newFarm: Farm): Promise<void> => {    
    newUser.password = await GenerateHash(newUser.password);
    await createEntrepreneurRepository(newUser, newFarm);
};
