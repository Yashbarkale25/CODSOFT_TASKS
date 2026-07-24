const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  applyJob,
  getApplications,
  getJobApplicants,
  updateApplicationStatus,
} = require("../controllers/applicationController");

// Student applies for a job
router.post("/", upload.single("resume"), applyJob);

// Get all applications
router.get("/", getApplications);

// Get all applicants for a specific job
router.get("/job/:jobId", getJobApplicants);

// Recruiter updates application status
router.put("/:id/status", updateApplicationStatus);

module.exports = router;