const express = require("express");
const applicantController = require("../controllers/applicant");
const validator = require("../validator/applicant")

const router = express.Router();

router.post("/", validator.createApplicantValidator, applicantController.createApplicant);
router.get("/", applicantController.getApplicants);
router.get("/:id", applicantController.getApplicant);
router.patch("/:id", validator.updateApplicantValidator, applicantController.updateApplicant);
router.delete("/:id", applicantController.deleteApplicant);

module.exports = router;
