const express = require("express");
const vacancyController = require("../controllers/vacancy");
const validator = require("../validator/vacancy")

const router = express.Router();

router.post("/", validator.createVacancyValidator, vacancyController.createVacancy);
router.get("/", vacancyController.getVacancys);
router.get("/:id", vacancyController.getVacancy);
// router.patch("/:id", validator.updatePostValidator, postController.updatePost);
router.delete("/:id", vacancyController.deleteVacancy);

module.exports = router;
