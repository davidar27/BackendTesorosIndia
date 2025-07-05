import { Router } from 'express';
import { paymentController } from '../../controllers/Payment/paymentController';
import { handlerPreference } from '@/controllers/Payment/handlerPreference'


const router = Router();

router.post('/preferencia', handlerPreference);

router.post('/webhook', paymentController);




export default router; 