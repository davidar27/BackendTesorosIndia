import db from '@/config/db';

export const deleteUserService = async (userId: number): Promise<void> => {
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        const [user]: any = await connection.execute(
            'SELECT usuario_id FROM usuario WHERE usuario_id = ?',
            [userId]
        );

        if (!user[0]) {
            throw new Error('Usuario no encontrado');
        }

        await connection.execute(
            'DELETE FROM usuario WHERE usuario_id = ?',
            [userId]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
