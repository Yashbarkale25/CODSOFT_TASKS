const Job = require("../models/Job");
const Application = require("../models/Application");

// Create Job
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experienceLevel,
      jobType,
      position,
      company,
      createdBy,
    } = req.body;

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      experienceLevel,
      jobType,
      position,
      company,
      createdBy,
    });

    return res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company")
      .populate("createdBy", "fullName email");

    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await Application.countDocuments({
          job: job._id,
        });

        return {
          ...job.toObject(),
          applicantCount,
        };
      })
    );

    return res.status(200).json(jobsWithApplicants);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
// Get Job By ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company")
      .populate("createdBy", "fullName email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};