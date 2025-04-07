import UserAuth from "../../models/Auth/userAuth";
import { authUserRepository, loginResult } from "../../repositories/Auth/authUserRepository";


export const authUserService = async (auth: UserAuth): Promise<loginResult> => {
    return await authUserRepository(auth);
}



