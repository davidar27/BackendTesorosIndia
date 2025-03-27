import { Router } from 'express';
import { cartMiddleware } from '../../middleware/cart/cartMiddleware';
import { addProductController } from '../../controllers/Cart/addProductController';
import { updateQuantityController } from '../../controllers/Cart/updateQuantityController';
import { deleteProductController } from '../../controllers/Cart/deleteProductController';
import { emptyCartController } from '../../controllers/Cart/emptyCartController';
import { getCartController } from '../../controllers/Cart/getCartController';

const router = Router();

// Agregar producto al carrito 
router.post('/add', cartMiddleware, addProductController);

// Actualizar cantidad de un producto 
router.put('/update', cartMiddleware, updateQuantityController);

// Eliminar un producto del carrito
router.delete('/remove', cartMiddleware, deleteProductController);

// Vaciar el carrito del cliente
router.delete('/clear', emptyCartController);

// Consultar el contenido del carrito
router.get('/get', getCartController);

export default router;