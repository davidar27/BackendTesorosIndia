import express from "express";
import { getPacksController } from "@/controllers/Package/getPackagesController";
import { searchPackagesController } from "@/controllers/Package/searchPackagesController";
import { getPackageController } from "@/controllers/Package/getPackController";
const router = express.Router();

router.get("/buscar", searchPackagesController);
router.get("/", getPacksController);
router.get("/:id", getPackageController);

export default router;