import { Router } from 'express';
import { cartMiddleware } from '@/middleware/cart/cartMiddleware';
import { addProductController } from '@/controllers/Cart/addProductController';
import { updateQuantityController } from '@/controllers/Cart/updateQuantityController';
import { deleteProductController } from '@/controllers/Cart/deleteProductController';
import { emptyCartController } from '@/controllers/Cart/emptyCartController';
import { getCartController } from '@/controllers/Cart/getCartController';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';

const router = Router();

// Agregar producto al carrito 
router.post('/add', authMiddlewareToken, checkRole('cliente'), cartMiddleware, addProductController);

// Actualizar cantidad de un producto 
router.put('/update', authMiddlewareToken, checkRole('cliente'), cartMiddleware, updateQuantityController);

// Eliminar un producto del carrito
router.delete('/remove', authMiddlewareToken, checkRole('cliente'), cartMiddleware, deleteProductController);

// Vaciar el carrito del cliente
router.delete('/clear', authMiddlewareToken, checkRole('cliente'), emptyCartController);

// Consultar el contenido del carrito
router.get('/get', authMiddlewareToken, checkRole('cliente'), getCartController);

export default router;