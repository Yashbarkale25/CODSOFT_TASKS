const Application = require("../models/Application");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const Job = require("../models/Job");

// ==============================
// Apply for Job
// ==============================
const applyJob = async (req, res) => {
  try {
    const { job, applicant } = req.body;

    if (!job || !applicant) {
      return res.status(400).json({
        message: "Job ID and Applicant ID are required",
      });
    }

    const alreadyApplied = await Application.findOne({
      job,
      applicant,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job,
      applicant,
      resume: req.file ? req.file.path : "",
      status: "Pending",
    });
    const applicantData = await User.findById(applicant);

const jobData = await Job.findById(job).populate("company");

await sendEmail(
  applicantData.email,
  "Application Submitted Successfully",
  `Hi ${applicantData.fullName},

Your application for "${jobData.title}" has been submitted successfully.

Company: ${jobData.company?.name}

We wish you all the best!

Job Portal Team`
);

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
  
// ==============================
// Get All Applications
// ==============================
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .populate("applicant", "fullName email phoneNumber profile");

    return res.status(200).json(applications);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==============================
// Get Applicants of One Job
// ==============================
const getJobApplicants = async (req, res) => {
  try {

    const { jobId } = req.params;

    const applications = await Application.find({
      job: jobId,
    })
      .populate(
        "applicant",
        "fullName email phoneNumber profile"
      )
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    return res.status(200).json(applications);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==============================
// Update Application Status
// ==============================
const updateApplicationStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    if (
      !["Pending", "Accepted", "Rejected"].includes(status)
    ) {
      return res.status(400).json({
        message: "Invalid Status",
      });
    }

    const application = await Application.findById(id)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = status;

    await application.save();

    await Notification.create({
      user: application.applicant,
      message: `Your application for "${application.job.title}" has been ${status}.`,
      isRead: false,
    });
    const applicantData = await User.findById(application.applicant);

await sendEmail(
  applicantData.email,
  `Application ${status}`,
  `Hi ${applicantData.fullName},

Your application for "${application.job.title}" has been ${status}.

Thank you for using our Job Portal.

Regards,
Job Portal Team`
);
    return res.status(200).json({
      message: "Application status updated successfully",
      application,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  applyJob,
  getApplications,
  getJobApplicants,
  updateApplicationStatus,
};