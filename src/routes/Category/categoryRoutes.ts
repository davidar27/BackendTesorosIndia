import express from "express";
import { getCategoriesController } from "@/controllers/Category/getCategoryController";

const router = express.Router();

router.get("/", getCategoriesController);

export default router;