import GenerateHast from "../helpers/hashGenerator";
import User from "../models/userRegisterDto";
import userRepository from "../repositories/userRepository";

class userRegisterService{
    static async register(user: User){
        user.password_hash = await GenerateHast(user.password_hash);
        return await userRepository.add(user);
    }
}
export default userRegisterService;