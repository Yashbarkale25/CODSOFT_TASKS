const Job = require("../models/Job");
const Company = require("../models/Company");
const Application = require("../models/Application");

const getDashboardStats = async (req, res) => {
  try {
    const { recruiterId } = req.params;

    // Recruiter's companies
    const companies = await Company.find({
      createdBy: recruiterId,
    });

    // Recruiter's jobs (directly by createdBy)
    const jobs = await Job.find({
      createdBy: recruiterId,
    });

    const jobIds = jobs.map((job) => job._id);

    // Applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("applicant", "fullName email")
      .populate("job", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      totalCompanies: companies.length,
      totalJobs: jobs.length,
      totalApplications: applications.length,
      accepted: applications.filter(
        (a) => a.status === "Accepted"
      ).length,
      rejected: applications.filter(
        (a) => a.status === "Rejected"
      ).length,
      pending: applications.filter(
        (a) => a.status === "Pending"
      ).length,
      recentApplications: applications.slice(0, 5),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};