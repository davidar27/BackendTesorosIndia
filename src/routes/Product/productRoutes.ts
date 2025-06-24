import express from 'express';
import { getAllProductsController } from '@/controllers/Product/getAllProductsController';
import { getProductByIdController } from '@/controllers/Product/getProductByIdController';
import { getProductsByCategoryController } from '@/controllers/Product/getProductsByCategoryController';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';

const router = express.Router();

// Rutas públicas de productos
router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);
router.get('/categorias/:categoryId', getProductsByCategoryController);
router.get('/?search', getAllProductsController);

export default router;
