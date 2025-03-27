import { deleteUserRepository } from "../../repositories/User/deleteUserRepository";

export const deleteUserService = async (gUseId: number) => {
    try {
        await deleteUserRepository(gUseId);
        return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar el usuario');
    }
};
