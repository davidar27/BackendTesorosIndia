import db from '@/config/db';
import { User, EntrepreneurProps } from '@/models/User/User';

export const updateEntrepreneurRepository = async (userData: User, changedFields: Partial<EntrepreneurProps>): Promise<void> => {
    if (Object.keys(changedFields).length === 0) return;
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const userFields = ['name', 'email', 'phone', 'image', 'description'];
        const setClauses: string[] = [];
        const values: any[] = [];
        userFields.forEach(field => {
            if (changedFields[field as keyof EntrepreneurProps] !== undefined) {
                let dbField = field;
                if (field === 'name') dbField = 'nombre';
                if (field === 'email') dbField = 'correo';
                if (field === 'phone') dbField = 'telefono';
                if (field === 'image') dbField = 'imagen';
                if (field === 'description') dbField = 'descripcion';
                setClauses.push(`${dbField} = ?`);
                values.push(changedFields[field as keyof EntrepreneurProps]);
            }
        });
        if (setClauses.length > 0) {
            await connection.execute(
                `UPDATE usuario SET ${setClauses.join(', ')} WHERE usuario_id = ? AND rol = 'emprendedor'`,
                [...values, userData.userId]
            );
        }

        if (changedFields.name_farm) {
            await connection.execute(
                `UPDATE finca SET nombre = ? WHERE emprendedor_id = ?`,
                [changedFields.name_farm, userData.userId]
            );
        }

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}; 