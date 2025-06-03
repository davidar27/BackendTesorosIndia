import { desactivateEntrepreneurRepository } from "@/repositories/Dashboard/entreprenaur/desactivateEntrepreneurRepository";
import { findByIdUserService } from "@/services/User/findByIdUserService";




export const desactivateEntrepreneurService = async (userId: number) => {
    try {
        const user = await findByIdUserService(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        if (user.role !== 'emprendedor') {
            throw new Error('El usuario no es un emprendedor');
        }

        await desactivateEntrepreneurRepository(userId);
        return user;
    } catch (error) {
        throw error;
    }
}
