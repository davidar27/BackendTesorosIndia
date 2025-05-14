import { Router } from 'express';
import { createProductController } from '../../controllers/Product/createProductController';
import { getProductByIdController } from '../../controllers/Product/getProductByIdController';
import { getAllProductsController } from '../../controllers/Product/getAllProductsController';
import { updateProductController } from '../../controllers/Product/updateProductController';
import { deleteProductController } from '../../controllers/Product/deleteProductController';
import { checkRole } from '../../middleware/Auth/checkRole';
import { authMiddlewareToken } from '../../middleware/Auth/authMiddlewareToken';

const router = Router();

router.post('/add', authMiddlewareToken, checkRole('emprendedor'), createProductController);
router.get('/get', authMiddlewareToken, checkRole('emprendedor'), getAllProductsController);
router.get('/get/:id', authMiddlewareToken, checkRole('emprendedor'), getProductByIdController);
router.put('/update/:id', authMiddlewareToken, checkRole('emprendedor'), updateProductController);
router.delete('/delete/:id', authMiddlewareToken, checkRole('emprendedor'), deleteProductController);

export default router;
