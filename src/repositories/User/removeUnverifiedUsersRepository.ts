import db from '@/config/db';

export const removeUnverifiedUsersRepository = async (): Promise<number> => {
    const [result]: any = await db.execute(`
        DELETE FROM usuario 
        WHERE verificado = 0 
        AND fecha_registro < NOW() - INTERVAL 24 HOUR
    `);
    return result.affectedRows;
};
