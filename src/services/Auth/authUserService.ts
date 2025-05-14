import { authUserRepository } from '../../repositories/Auth/authUserRepository';
import { loginResult } from '../../models/Auth/Auth';
import UserAuth from '../../models/Auth/userAuth';

export const authUserService = async (userAuth: UserAuth): Promise<loginResult> => {
    const result = await authUserRepository(userAuth);

    if (!result.logged) {
        const error = new Error(result.message || "Error de autenticación") as any;
        error.status = 401;
        error.errorType = result.errorType || 'general';
        error.redirectTo = result.redirectTo;
        throw error;
    }

    return result;
};
