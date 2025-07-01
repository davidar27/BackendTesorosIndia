import express from "express";
import { addReviewController } from '@/controllers/Reviews/addReviewController';
import { deleteReviewsController } from '@/controllers/Reviews/deleteReviewsController';
import { getReviewsByFincaController } from '@/controllers/Reviews/getReviewsController';
import { updateReviewController } from '@/controllers/Reviews/updateReviewController';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';

const router = express.Router();

router.post("/", authMiddlewareToken, checkRole(['cliente', "emprendedor"]), addReviewController);
router.put("/:review_id", authMiddlewareToken, checkRole('cliente'), updateReviewController);
router.delete("/delete/:id", authMiddlewareToken, checkRole('cliente'), deleteReviewsController);
router.get("/get/:id", authMiddlewareToken, checkRole('cliente'), getReviewsByFincaController);
router.get("/get-alls", getReviewsByFincaController);

export default router;