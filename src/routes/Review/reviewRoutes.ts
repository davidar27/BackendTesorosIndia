import express from "express";
import { addReviewController } from '@/controllers/Review/addReviewController';
import { deleteReviewController } from '@/controllers/Review/deleteReviewController';
import { updateReviewController } from '@/controllers/Review/updateReviewController';
import { authMiddlewareToken } from '@/middleware/Auth/authMiddlewareToken';
import { checkRole } from '@/middleware/Auth/checkRole';
import { validateContentMiddleware } from '@/middleware/ContentModeration/contentModerationMiddleware';

const router = express.Router();

router.post("/", authMiddlewareToken, checkRole(['cliente', "emprendedor"]), validateContentMiddleware, addReviewController);
router.put("/:review_id", authMiddlewareToken, checkRole(['cliente', "emprendedor"]), validateContentMiddleware, updateReviewController);
router.delete("/:review_id", authMiddlewareToken, checkRole(['cliente', "emprendedor"]), deleteReviewController);

export default router;