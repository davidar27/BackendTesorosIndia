import deleteUserRepositories from "../../repositories/User/deleteUserRepositories";

export const deleteUserService = async (user_id: number) => {
    try {
        await deleteUserRepositories(user_id);
        return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar el usuario');
    }
};
