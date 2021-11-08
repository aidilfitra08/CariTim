const express = require("express");
const adminController = require("../controllers/admin");
const validator = require("../validator/user");
const auth = require("../validator/auth");

const router = express.Router();

router.get("/", auth.verifyToken, adminController.getAdmins);
router.get("/:id", auth.verifyToken, adminController.getAdmin);
router.post("/login", validator.loginValidator, adminController.loginAdmin);

module.exports = router;
