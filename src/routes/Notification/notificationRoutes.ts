import { getNotificationsController } from "@/controllers/Notification/getNotificationController";
import { setViewNotificationsController } from "@/controllers/Notification/setViewNotificationsController";
import { setViewOneNotificationController } from "@/controllers/Notification/setViewOneNotificationController";
import { authMiddlewareToken } from "@/middleware/Auth/authMiddlewareToken";
import express from "express";

const router = express.Router();

router.get("/:userId", authMiddlewareToken, getNotificationsController);
router.put("/:userId/marcar/todas", authMiddlewareToken, setViewNotificationsController);
router.put("/:notificationId/marcar/una", authMiddlewareToken, setViewOneNotificationController);


export default router;