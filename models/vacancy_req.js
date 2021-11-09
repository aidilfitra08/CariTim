const mongoose = require("mongoose");

const vacancyreqSchema = new mongoose.Schema({
  vacancy_id: {
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

module.exports = mongoose.model("VacancyRequirement", vacancyreqSchema);
