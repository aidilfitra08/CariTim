const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  type: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now(),
    index: { expires: "10m" },
  },
});

module.exports = mongoose.model("Otp", otpSchema);
