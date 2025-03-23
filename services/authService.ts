import authRepository  from "../repositories/authRepository";
import userAuth from "../models/User/loginUser";
import User from "../models/User/registerUser";

class authService {

    static async login(p0: User, auth: userAuth) {
        return await authRepository.login(auth);
    }

}

export default authService;