import { Router } from 'express';
import { cartMiddleware } from '../../middleware/cart/cartMiddleware';
import { addProductController } from '../../controllers/Cart/addProductController';
import { updateQuantityController } from '../../controllers/Cart/updateQuantityController';
import { deleteProductController } from '../../controllers/Cart/deleteProductController';
import { emptyCartController } from '../../controllers/Cart/emptyCartController';
import { getCartController } from '../../controllers/Cart/getCartController';
import { verifyToken } from '../../middleware/Auth/verifyToken';
import { checkRole } from '../../middleware/Auth/checkRole';

const router = Router();

// Agregar producto al carrito 
router.post('/add', verifyToken, checkRole('cliente'), cartMiddleware, addProductController);

// Actualizar cantidad de un producto 
router.put('/update', verifyToken, checkRole('cliente'), cartMiddleware, updateQuantityController);

// Eliminar un producto del carrito
router.delete('/remove', verifyToken, checkRole('cliente'), cartMiddleware, deleteProductController);

// Vaciar el carrito del cliente
router.delete('/clear', verifyToken, checkRole('cliente'), emptyCartController);

// Consultar el contenido del carrito
router.get('/get', verifyToken, checkRole('cliente'), getCartController);

export default router;