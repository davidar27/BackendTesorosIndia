import { Router } from 'express';
import { cartMiddleware } from '@/middleware/cart/cartMiddleware';
import { addProductCartController } from '@/controllers/Cart/addProductController';
import { updateQuantityCartController } from '@/controllers/Cart/updateQuantityController';
import { deleteProductCartController } from '@/controllers/Cart/deleteProductController';
import { emptyCartController } from '@/controllers/Cart/emptyCartController';
import { getCartController } from '@/controllers/Cart/getCartController';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';

const router = Router();

router.post('/agregar', authMiddlewareToken, checkRole('cliente'), cartMiddleware, addProductCartController);
router.put('/actualizar', authMiddlewareToken, checkRole('cliente'), cartMiddleware, updateQuantityCartController);
router.delete('/eliminar', authMiddlewareToken, checkRole('cliente'), cartMiddleware, deleteProductCartController);
router.delete('/vaciar', authMiddlewareToken, checkRole('cliente'), emptyCartController);
router.get('/obtener', authMiddlewareToken, checkRole('cliente'), getCartController);


export default router;