import GenerateHast from "../../helpers/hashGenerator";
import User from "../../models/User/userRegisterDto";
import userRepository from "../../repositories/User/userRepository";

class userRegisterService{
    static async register(user: User){
        user.password = await GenerateHast(user.password);
        return await userRepository.add(user);
    }
}
export default userRegisterService;