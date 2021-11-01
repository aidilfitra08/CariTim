const express = require("express");
const userController = require("../controllers/user");
const validator = require("../validator/user")

const router = express.Router();

router.post("/", validator.createUserValidator, userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
// router.patch("/:id", validator.updateUserValidator, userController.updateUser);
// router.delete("/:id", userController.deleteUser);

router.post("/login", userController.loginUser);

module.exports = router;
