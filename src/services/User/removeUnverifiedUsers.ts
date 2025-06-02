import db from '@/config/db';

export const deleteUnverifiedUsersService = async (): Promise<number> => {
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        // Eliminar usuarios no verificados
        const [result]: any = await connection.execute(
            'DELETE FROM usuario WHERE verificado = false AND rol = "cliente"'
        );

        await connection.commit();
        return result.affectedRows;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
