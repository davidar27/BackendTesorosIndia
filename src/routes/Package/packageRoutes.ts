import express from "express";
import { getPackagesController } from "@/controllers/Package/getPackagesController";
import { searchPackagesController } from "@/controllers/Package/searchPackagesController";
import { getPackageController } from "@/controllers/Package/getPackageController";
const router = express.Router();

router.get("/buscar", searchPackagesController);
router.get("/", getPackagesController);
router.get("/:id", getPackageController);

export default router;