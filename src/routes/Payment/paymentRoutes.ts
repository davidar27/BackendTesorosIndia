import { Router } from 'express';
import { paymentController } from '../../controllers/Payment/paymentController';
import { handlerPreference } from '@/controllers/Payment/handlerPreference'
import { cancelBuyController } from '@/controllers/Payment/cancelBuyController';


const router = Router();

router.post('/preferencia', handlerPreference);
router.post('/webhook', paymentController);
router.put("/cancelar", cancelBuyController);

export default router; 