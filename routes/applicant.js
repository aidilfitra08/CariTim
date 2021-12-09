const express = require("express");
const applicantController = require("../controllers/applicant");
const validator = require("../validator/applicant")
const auth = require("../validator/auth")

const router = express.Router();

router.post("/", [auth.verifyToken, validator.createApplicantValidator], applicantController.createApplicant);
router.get("/", applicantController.getApplicants);
router.get("/user/:id", applicantController.getApplicantByUser);
router.get("/:id", applicantController.getApplicant);
router.patch("/:id", [auth.verifyToken, validator.updateApplicantValidator], applicantController.updateApplicant);
router.delete("/:id", auth.verifyToken, applicantController.deleteApplicant);

module.exports = router;
