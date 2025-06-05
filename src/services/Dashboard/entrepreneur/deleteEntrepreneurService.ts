import { deleteEntrepreneurRepository } from "@/repositories/Dashboard/entreprenaur/deleteEntrepreneurRepository";
import { findByIdUserService } from "@/services/User/findByIdUserService";




export const deleteEntrepreneurService = async (userId: number) => {
    try {
        const user = await findByIdUserService(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        if (user.role !== 'emprendedor') {
            throw new Error('El usuario no es un emprendedor');
        }

        await deleteEntrepreneurRepository(userId);
        return user;
    } catch (error) {
        throw error;
    }
}
