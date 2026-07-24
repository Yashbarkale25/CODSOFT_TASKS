const Profile = require("../models/Profile");

// ==========================
// Create or Update Profile
// ==========================
const saveProfile = async (req, res) => {
  try {
    const { user, bio, skills, resume, profilePhoto } = req.body;

    let profile = await Profile.findOne({ user });

    if (profile) {
      profile.bio = bio;
      profile.skills = skills;
      profile.resume = resume;
      profile.profilePhoto = profilePhoto;

      await profile.save();

      return res.status(200).json({
        message: "Profile updated successfully",
        profile,
      });
    }

    profile = await Profile.create({
      user,
      bio,
      skills,
      resume,
      profilePhoto,
    });

    return res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Get Profile
// ==========================
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", "fullName email phoneNumber role");

    // Automatically create profile if it doesn't exist
    if (!profile) {
      profile = await Profile.create({
        user: req.params.userId,
        bio: "",
        skills: [],
        resume: "",
        profilePhoto: "",
      });

      profile = await Profile.findById(profile._id).populate(
        "user",
        "fullName email phoneNumber role"
      );
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Upload Resume
// ==========================
const uploadResume = async (req, res) => {
  try {
    const { user } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume",
      });
    }

    let profile = await Profile.findOne({ user });

    if (!profile) {
      profile = await Profile.create({
        user,
        bio: "",
        skills: [],
        profilePhoto: "",
      });
    }

    profile.resume = `/uploads/${req.file.filename}`;

    await profile.save();

    return res.status(200).json({
      message: "Resume uploaded successfully",
      resume: profile.resume,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// Update Profile
// ==========================
const updateProfile = async (req, res) => {
  try {
    const { user, bio, skills, profilePhoto } = req.body;

    let profile = await Profile.findOne({ user });

    if (!profile) {
      profile = await Profile.create({
        user,
        bio,
        skills,
        profilePhoto,
        resume: "",
      });
    } else {
      profile.bio = bio;
      profile.skills = skills;
      profile.profilePhoto = profilePhoto;
    }

    await profile.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  saveProfile,
  getProfile,
  uploadResume,
  updateProfile,
};