import cron from 'node-cron';
import { removeUnverifiedUsers } from '@/services/User/removeUnverifiedUsers';

cron.schedule('0 3 * * *', async () => {
    console.log('[CRON] Running unverified user cleanup task...');
    await removeUnverifiedUsers();
});
