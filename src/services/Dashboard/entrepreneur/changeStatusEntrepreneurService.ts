import { findByIdUserService } from "@/services/User/findByIdUserService";
import { changeStatusEntrepreneurRepository } from "@/repositories/Dashboard/entreprenaur/changeStatusEntrepreneurRepository";

export const changeStatusEntrepreneurService = async (userId: number, status: 'Activo' | 'Inactivo') => {
    const exists = await findByIdUserService(userId);
    if (!exists) throw new Error('Emprendedor no encontrado');

    await changeStatusEntrepreneurRepository(userId, status);
    return { message: 'Estado actualizado correctamente', status };
};