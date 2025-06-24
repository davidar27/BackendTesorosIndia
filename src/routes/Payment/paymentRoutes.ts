import { Router } from 'express';
import { webhookController } from '../../controllers/Payment/webhookController';
import { createBrickPreferenceController } from '../../controllers/Payment/createBrickPreferenceController';

const router = Router();

router.post('/webhook', webhookController);
router.post('/preferencia', createBrickPreferenceController);

export default router; 