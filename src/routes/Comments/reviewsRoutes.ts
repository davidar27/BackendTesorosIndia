import express from "express";
import { addReviewController } from '@/controllers/Review/addReviewController';
import { deleteReviewController } from '@/controllers/Review/deleteReviewController';
import { getReviewsByFincaController } from '@/controllers/Review/getReviewsController';
import { updateReviewController } from '@/controllers/Review/updateReviewController';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';

const router = express.Router();

router.post("/", authMiddlewareToken, checkRole(['cliente', "emprendedor"]), addReviewController);
router.put("/:review_id", authMiddlewareToken, checkRole(['cliente', "emprendedor"]), updateReviewController);
router.delete("/:review_id", authMiddlewareToken, checkRole(['cliente', "emprendedor"]), deleteReviewController);
router.get("/get/:id", authMiddlewareToken, checkRole('cliente'), getReviewsByFincaController);
router.get("/get-alls", getReviewsByFincaController);

export default router;