const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

// Get all notifications for a user
router.get("/:userId", getNotifications);

// Mark notification as read
router.put("/:id", markAsRead);

module.exports = router;