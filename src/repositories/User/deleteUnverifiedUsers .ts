import db from '@/config/db';

export const deleteUnverifiedUsers = async (): Promise<void> => {
    await db.execute(`
    DELETE FROM usuario 
    WHERE verificado = 0 
    AND fecha_registro < NOW() - INTERVAL 24 HOUR
  `);
};
