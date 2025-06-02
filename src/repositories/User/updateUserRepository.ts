import db from '../../config/db';

export const updateUserRepository = async (
    userId: number,
    userData: { nombre: string; correo?: string; telefono: string; imagen?: string | null },
    farmName: string
): Promise<void> => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.execute(
            `UPDATE usuario SET nombre = ?, telefono = ?, imagen = ? WHERE usuario_id = ?`,
            [userData.nombre, userData.telefono, userData.imagen || null, userId]
        );

        if (farmName) {
            await connection.execute(
                `UPDATE finca SET nombre = ? WHERE emprendedor_id = ?`,
                [farmName, userId]
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
