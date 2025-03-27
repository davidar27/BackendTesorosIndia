import { Router } from 'express';
import { createProductController } from '../../controllers/Product/createProductController';
import { getProductByIdController } from '../../controllers/Product/getProductByIdController';
import { getAllProductsController } from '../../controllers/Product/getAllProductsController';
import { updateProductController } from '../../controllers/Product/updateProductController';
import { deleteProductController } from '../../controllers/Product/deleteProductController';
import { checkRole } from '../../middleware/Auth/checkRole';
import { verifyToken } from '../../middleware/Auth/verifyToken';

const router = Router();

router.post('/add', verifyToken, checkRole('emprendedor'), createProductController);
router.get('/get', verifyToken, checkRole('emprendedor'), getAllProductsController);
router.get('/get/:id', verifyToken, checkRole('emprendedor'), getProductByIdController);
router.put('/update/:id', verifyToken, checkRole('emprendedor'), updateProductController);
router.delete('/delete/:id', verifyToken, checkRole('emprendedor'), deleteProductController);

export default router;
