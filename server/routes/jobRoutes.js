const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/isAuthenticated");

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Public Routes
router.get("/", getJobs);
router.get("/:id", getJobById);

// Protected Routes
router.post("/", isAuthenticated, createJob);
router.put("/:id", isAuthenticated, updateJob);
router.delete("/:id", isAuthenticated, deleteJob);

module.exports = router;