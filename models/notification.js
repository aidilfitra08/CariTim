const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
