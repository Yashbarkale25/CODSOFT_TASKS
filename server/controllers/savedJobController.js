const SavedJob = require("../models/SavedJob");

// Save Job
exports.saveJob = async (req, res) => {
  try {
    const { user, job } = req.body;

    const exists = await SavedJob.findOne({ user, job });

    if (exists) {
      return res.status(400).json({
        message: "Job already saved",
      });
    }

    const savedJob = await SavedJob.create({
      user,
      job,
    });

    res.status(201).json({
      message: "Job saved successfully",
      savedJob,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Saved Jobs
exports.getSavedJobs = async (req, res) => {
  try {
    const jobs = await SavedJob.find({
      user: req.params.userId,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    res.json(jobs);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Saved Job
exports.deleteSavedJob = async (req, res) => {
  try {
    await SavedJob.findByIdAndDelete(req.params.id);

    res.json({
      message: "Saved job removed",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};