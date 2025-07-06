import { Router } from 'express';
import { paymentController } from '../../controllers/Payment/paymentController';
import { handlerPreference } from '@/controllers/Payment/handlerPreference'
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';
import { cancelBuyController } from '@/controllers/Payment/cancelBuyController';


const router = Router();

router.post('/preferencia', handlerPreference);
router.post('/webhook', paymentController);
// GET para permitir el consumo en correo mediante <a/>
router.get("/cancelar", authMiddlewareToken, checkRole("cliente"), cancelBuyController);

export default router; 