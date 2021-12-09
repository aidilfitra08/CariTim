const express = require("express");
const notificationController = require("../controllers/notification");
const validator = require("../validator/notification")
const auth = require("../validator/auth")

const router = express.Router();

router.post("/", [auth.verifyToken,validator.createNotificationValidator], notificationController.createNotification);
router.get("/", auth.verifyToken, notificationController.getNotifications);
router.get("/user/:id", auth.verifyToken, notificationController.getUserNotifications);
router.get("/:id", auth.verifyToken, notificationController.getNotification);
router.patch("/:id", [auth.verifyToken, validator.updateNotificationValidator], notificationController.updateNotification);
router.delete("/:id", auth.verifyToken, notificationController.deleteNotification);

module.exports = router;
