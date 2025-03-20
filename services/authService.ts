import authRepository  from "../repositories/authRepository";
import userAuth from "../dto/authDto";

class authService {

    static async login(auth: userAuth) {
        return await authRepository.login(auth);
    }

}

export default authService;