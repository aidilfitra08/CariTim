const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  email_confirmed: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: String,
  },
  birth_date: {
    type: Date,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  job: {
    type: String,
  },
  institution: {
    type: String,
  },
  about: {
    type: String,
  },
  profile_picture: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
