import GenerateHash from "@/helpers/User/hashGenerator";
import updateUserPasswordRepository from "@/repositories/Auth/updateUserPasswordRepository";

const updateUserPasswordService = async (email: string, password: string) => {
    const hashedPassword = await GenerateHash(password);
    await updateUserPasswordRepository(email, hashedPassword);
}

export default updateUserPasswordService;
