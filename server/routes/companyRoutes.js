const express = require("express");
const router = express.Router();

const uploadCompanyLogo = require("../middleware/companyLogoUpload");

const {
  createCompany,
  getCompanies,
  getCompanyById,
  getMyCompanies,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

// Create Company
router.post(
  "/",
  uploadCompanyLogo.single("logo"),
  createCompany
);

// Get All Companies
router.get("/", getCompanies);

// Get Recruiter's Companies
router.get("/companies/:userId", getMyCompanies);

// Get Company By ID
router.get("/:id", getCompanyById);

// Update Company
router.put(
  "/:id",
  uploadCompanyLogo.single("logo"),
  updateCompany
);

// Delete Company
router.delete("/:id", deleteCompany);

module.exports = router;