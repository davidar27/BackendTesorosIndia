import { Router } from 'express';
import { webhookController } from '../../controllers/Payment/webhookController';
import { handlerPreference } from '@/controllers/Payment/Preference'

const router = Router();
router.post('/preferencia', handlerPreference);
// router.post('/webhook', webhookController);




export default router; 