import { findByIdGenericService } from "@/repositories/Dashboard/findByIdGenericService";
import { changeStatusRepository } from "@/repositories/Dashboard/changeStatusRepository";

type EntityType = 'entrepreneur' | 'experience' | 'category' | 'package';
type Status = 'activo' | 'inactivo' | 'pendiente';

export const changeStatusService = async (
    id: number, 
    status: Status, 
    entityType: EntityType
) => {
    const exists = await findByIdGenericService(id, entityType);
    if (!exists) throw new Error(`${entityType} no encontrado`);

    await changeStatusRepository(id, status, entityType);
    return { 
        message: 'Estado actualizado correctamente', 
        status,
        entityType
    };
};