import { Router } from 'express';
import { addProduct, deleteProduct, emptyCart, getCart, updateQuantity } from '../controllers/cartController';
import { cartMiddleware } from '../middleware/cartMiddleware';

const router = Router();

// Agregar producto al carrito 
router.post('/add', cartMiddleware, addProduct);

// Actualizar cantidad de un producto 
router.put('/update', cartMiddleware, updateQuantity);

// Eliminar un producto del carrito
router.delete('/remove', cartMiddleware, deleteProduct);

// Vaciar el carrito del cliente
router.delete('/clear', emptyCart);

// Consultar el contenido del carrito
router.get('/get', getCart);

export default router;