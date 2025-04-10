import express from "express";
import { createRviewsController } from '../../controllers/Reviews/addReviewsController';
import { deleteReviewsController } from '../../controllers/Reviews/deleteReviewsController';
import { getReviewsByFincaController } from '../../controllers/Reviews/getReviewsController';
import { updateReviewsController } from '../../controllers/Reviews/updateReviewsController';
import { verifyToken } from "../../middleware/Auth/verifyToken";
import { checkRole } from "../../middleware/Auth/checkRole";


const router = express.Router();

router.post("/Reviews", verifyToken, checkRole('usuario'), createRviewsController);
router.put("/Reviews/:id", verifyToken, checkRole('usuario'), updateReviewsController);
router.delete("/Reviews/:id", verifyToken, checkRole('usuario'), deleteReviewsController);
router.get("/Reviews/:id", verifyToken, checkRole('usuario'), getReviewsByFincaController);

export default router;

