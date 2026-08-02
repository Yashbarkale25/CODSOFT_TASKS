const Company = require("../models/Company");

// ==========================
// Create Company
// ==========================
const createCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      website,
      location,
      createdBy,
    } = req.body;

    if (!name || !createdBy) {
      return res.status(400).json({
        message: "Company name and creator are required",
      });
    }

    const existingCompany = await Company.findOne({ name });

    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists",
      });
    }

    const company = await Company.create({
      name,
      description,
      website,
      location,
     logo: req.file ? req.file.path : "",
      createdBy,
    });

    res.status(201).json({
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Get All Companies
// ==========================
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({
      createdAt: -1,
    });

    res.status(200).json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Get My Companies
// ==========================
const getMyCompanies = async (req, res) => {
  try {
    const { userId } = req.params;

    const companies = await Company.find({
      createdBy: userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// ==========================
// Get Company By ID
// ==========================
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Update Company
// ==========================
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    company.name = req.body.name || company.name;
    company.description =
      req.body.description || company.description;
    company.website =
      req.body.website || company.website;
    company.location =
      req.body.location || company.location;

    if (req.file) {
  company.logo = req.file.path;
}

    await company.save();

    res.status(200).json({
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Delete Company
// ==========================
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    await Company.findByIdAndDelete(id);

    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  getMyCompanies,
  updateCompany,
  deleteCompany,
};