const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/", adminController.getAdmins);
router.get("/:id", adminController.getAdmin);
router.post("/login", adminController.loginAdmin);

module.exports = router;
