import express from 'express';
import { getAllProductsController } from '@/controllers/Product/getAllProductsController';
import { getProductByIdController } from '@/controllers/Product/getProductByIdController';
import { getProductsByCategoryController } from '@/controllers/Product/getProductsByCategoryController';
import { searchProductsController } from '@/controllers/Product/searchProductsController';
const router = express.Router();

// Rutas públicas de productos
router.get('/categorias/:categoryId', getProductsByCategoryController);
router.get('/buscar', searchProductsController);
router.get('/:id', getProductByIdController);
router.get('/', getAllProductsController);

export default router;
