import GenerateHast from "../helpers/hashGenerator";
import User from "../models/userRegisterDto";
import userRepository from "../repositories/userRepository";

class userRegisterService{
    static async register(user: User){
        user.password = await GenerateHast(user.password);
        return await userRepository.add(user);
    }
}
export default userRegisterService;