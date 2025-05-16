import { Router } from 'express';
import { createProductController } from '../../controllers/Product/createProductController';
import { getProductByIdController } from '../../controllers/Product/getProductByIdController';
import { getAllProductsController } from '../../controllers/Product/getAllProductsController';
import { updateProductController } from '../../controllers/Product/updateProductController';
import { deleteProductController } from '../../controllers/Product/deleteProductController';
import { checkRole } from '../../middleware/Auth/checkRole';
import { authMiddlewareToken } from '../../middleware/Auth/authMiddlewareToken';

const router = Router();

router.post('/agregar', authMiddlewareToken, checkRole('emprendedor'), createProductController);
router.get('/obtener-productos', authMiddlewareToken, checkRole('emprendedor'), getAllProductsController);
router.get('/obtener/:id', authMiddlewareToken, checkRole('emprendedor'), getProductByIdController);
router.put('/actualizar/:id', authMiddlewareToken, checkRole('emprendedor'), updateProductController);
router.delete('/eliminar/:id', authMiddlewareToken, checkRole('emprendedor'), deleteProductController);

export default router;
