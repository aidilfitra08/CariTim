const express = require("express");
const chatController = require("../controllers/chat");
const validator = require("../validator/chat");
const auth = require("../validator/auth");

const router = express.Router();

router.post("/room/", auth.verifyToken, chatController.createRoomChat);
router.post("/messages/", auth.verifyToken, chatController.createMessage);
router.get("/room/", chatController.getRoomChats);
router.get("/room/:id", chatController.getRoomChat);
// router.patch("/:id", validator.updateVacancyValidator, vacancyController.updateVacancy);
// router.delete("/:id", vacancyController.deleteVacancy);

module.exports = router;
