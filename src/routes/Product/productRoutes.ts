import express from 'express';
import { getAllProductsController } from '@/controllers/Product/getAllProductsController';
import { getProductByIdController } from '@/controllers/Product/getProductByIdController';
import { getProductsByCategoryController } from '@/controllers/Product/getProductsByCategoryController';
import { searchProductsController } from '@/controllers/Product/searchProductsController';
import { getInfoProductController } from '@/controllers/Product/getInfoProductController';
const router = express.Router();

router.get('/categorias/:categoryId', getProductsByCategoryController);
router.get('/buscar', searchProductsController);
// router.get('/:id', getProductByIdController);
router.get('/', getAllProductsController);
router.get('/informacion/:product_id', getInfoProductController)

export default router;
