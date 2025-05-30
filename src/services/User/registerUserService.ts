import GenerateHash from "../../helpers/User/hashGenerator";
import { User } from "../../models/User/User";
import { createUserRepository } from "../../repositories/User/createUserRepository";

export const registerUserService = async (userData: {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    verified: boolean;
    role: string;
    userId: number;
    description: string;
    token_version: number;
}): Promise<User> => {
    try {
        const hashedPassword = await GenerateHash(userData.password);

        const user = new User(
            userData.name,
            userData.email, 
            userData.phone_number,
            hashedPassword,
            false,
            userData.role,
            userData.userId,
            userData.description,
            userData.token_version
        );

        const newUser = await createUserRepository(user);
        
        return newUser;
    } catch (error) {
        throw new Error(`Error in registerUserService: ${error instanceof Error ? error.message : String(error)}`);
    }
};
