import { User } from "@/models/User/User";
import { findByEmailRepository } from "@/repositories/User/findByEmailRepository";

interface VerificationResult {
    logged: boolean;
    status: string;
    message: string;
    errorType: string;
    userId?: number;
    email?: string;
    role?: string;
    token_version?: number;
}

export const findByEmailUserService = async (email: string): Promise<User | VerificationResult | null> => {
    try {
        const result = await findByEmailRepository(email);
        return result;
    } catch (error) {
        throw error;
    }
};

