const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  saveProfile,
  getProfile,
  uploadResume,
  updateProfile,
} = require("../controllers/profileController");

// Save Profile
router.post("/", saveProfile);

// Update Profile
router.put("/", updateProfile);

// Upload Resume
router.post(
  "/upload-resume",
  upload.single("resume"),
  uploadResume
);

// Get Profile
router.get("/:userId", getProfile);

module.exports = router;