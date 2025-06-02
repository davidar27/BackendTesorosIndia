import cron from 'node-cron';
import db from '@/config/db';

cron.schedule('0 3 * * *', async () => {
    await db.execute(`
      DELETE FROM usuario 
      WHERE verificado = 0 
      AND fecha_registro < NOW() - INTERVAL 24 HOUR
    `);
});