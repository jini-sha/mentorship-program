const express = require("express");
const router = express.Router();
const applicantController = require("../controllers/applicant.controller");

router.post("/create", applicantController.createApplicant);
router.get("/:department", applicantController.getApplicants);
router.patch("/:id/status", applicantController.updateApplicantStatus);
router.delete("/:id", applicantController.deleteApplicant);

module.exports = router;
