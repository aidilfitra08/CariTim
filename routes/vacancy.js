const express = require("express");
const vacancyController = require("../controllers/vacancy");
const validator = require("../validator/vacancy")
const auth = require("../validator/auth")

const router = express.Router();

router.post("/", [auth.verifyToken, validator.createVacancyValidator], vacancyController.createVacancy);
router.get("/", vacancyController.getVacancys);
router.get("/user/:id", vacancyController.getVacancyByUser);
router.get("/:id", vacancyController.getVacancy);
router.patch("/:id", [auth.verifyToken, validator.updateVacancyValidator], vacancyController.updateVacancy);
router.delete("/:id", auth.verifyToken, vacancyController.deleteVacancy);

module.exports = router;
