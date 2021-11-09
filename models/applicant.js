const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  vacancy_id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    require: true,
  },
  status: {
    type: Number,
    min: 1,
    max: 3,
    default: null,
  },
  amount: {
    type: Number,
    require: true
  },

});

module.exports = mongoose.model("Applicant", applicantSchema);
