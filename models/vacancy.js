const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Vacancy", vacancySchema);
