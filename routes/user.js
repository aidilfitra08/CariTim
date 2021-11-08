const express = require("express");
const userController = require("../controllers/user");
const validator = require("../validator/user")
const auth = require("../validator/auth")

const router = express.Router();

router.post("/", validator.createUserValidator, userController.createUser);
router.get("/", auth.verifyToken, userController.getUsers);
router.get("/:id", userController.getUser);
router.patch("/:id", [auth.verifyToken, validator.updateUserValidator], userController.updateUser);
// router.delete("/:id", userController.deleteUser);

router.post("/login", validator.loginValidator, userController.loginUser);

module.exports = router;
