import findAllUserRepositories from "../../repositories/User/findAllUserRepositories";



export const gettAllUsersServices =  async () => {
    return await findAllUserRepositories();
}



