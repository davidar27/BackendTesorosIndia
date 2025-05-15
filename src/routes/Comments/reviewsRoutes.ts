import express from "express";
import { createRviewsController } from '../../controllers/Reviews/addReviewsController';
import { deleteReviewsController } from '../../controllers/Reviews/deleteReviewsController';
import { getReviewsByFincaController } from '../../controllers/Reviews/getReviewsController';
import { updateReviewsController } from '../../controllers/Reviews/updateReviewsController';
import { authMiddlewareToken } from "../../middleware/Auth/authMiddlewareToken";
import { checkRole } from "../../middleware/Auth/checkRole";


const router = express.Router();

router.post("/public", authMiddlewareToken, checkRole('cliente'), createRviewsController);
router.put("/update/:id", authMiddlewareToken, checkRole('cliente'), updateReviewsController);
router.delete("/delete/:id", authMiddlewareToken, checkRole('cliente'), deleteReviewsController);
router.get("/get/:id", authMiddlewareToken, checkRole('cliente'), getReviewsByFincaController);
router.get("/get-alls", getReviewsByFincaController);

export default router;

