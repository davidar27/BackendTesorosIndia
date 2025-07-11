import express from 'express';
import { getAllProductsController } from '@/controllers/Product/getAllProductsController';
import { getProductsByCategoryController } from '@/controllers/Product/getProductsByCategoryController';
import { searchProductsController } from '@/controllers/Product/searchProductsController';
import { getInfoProductController } from '@/controllers/Product/getInfoProductController';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';
import { createProductController } from '@/controllers/Product/createProductController';
import { uploadSingleFile } from '@/config/multerConfig';
import { deleteProductController } from '@/controllers/Product/deleteProductController';
import { updateProductController } from '@/controllers/Product/updateProductController';
import { updateProductStatusController } from '@/controllers/Product/updateProductStatusController';
import { getTopProductsByExperienceController } from '@/controllers/Product/getTopProductsByExperienceController';
const router = express.Router();

router.get('/categorias/:categoryId', getProductsByCategoryController);
router.get('/buscar', searchProductsController);
router.get('/', getAllProductsController);
router.get('/informacion/:product_id', getInfoProductController)
router.get('/top/:userId', getTopProductsByExperienceController)



router.post('/:experience_id', uploadSingleFile, authMiddlewareToken, checkRole("emprendedor"), createProductController)

router.put('/estado/:product_id', authMiddlewareToken, checkRole("emprendedor"), updateProductStatusController)

router.put('/:product_id/:experience_id', uploadSingleFile, authMiddlewareToken, checkRole("emprendedor"), updateProductController)

export default router;
