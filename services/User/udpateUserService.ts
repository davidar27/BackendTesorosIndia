import updateUserRepositories from '../../repositories/User/updateUserRepositories';
import user from '../../models/User/user';

export const udpateUserService = async (user_id: number, userData: user) => {
    try {
        await updateUserRepositories(user_id, userData);
        return { message: 'Usuario actualizado correctamente' };
    } catch (error) {
        throw new Error('Error al actualizar el usuario');
    }
};
