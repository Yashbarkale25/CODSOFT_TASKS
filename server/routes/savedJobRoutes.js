const express = require("express");
const router = express.Router();

const {
  saveJob,
  getSavedJobs,
  deleteSavedJob,
} = require("../controllers/savedJobController");

router.post("/", saveJob);

router.get("/:userId", getSavedJobs);

router.delete("/:id", deleteSavedJob);

module.exports = router;