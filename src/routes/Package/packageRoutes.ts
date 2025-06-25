import express from "express";
import { getPacksController } from "@/controllers/Package/getPackagesController";
import { searchPackagesController } from "@/controllers/Package/searchPackagesController";
const router = express.Router();

router.get("/buscar", searchPackagesController);
router.get("/", getPacksController);

export default router;