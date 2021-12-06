const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  user_id: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    require: true,
  },
  job_description: {
    type: String,
    default: null,
  },
  amount: {
    type: Date,
    require: true
  },  
});

module.exports = mongoose.model("Vacancy", vacancySchema);
