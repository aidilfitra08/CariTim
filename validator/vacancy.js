const { body } = require("express-validator");

exports.createVacancyValidator = [
  // title
  body("title", "title is required").notEmpty(),

  // type
  body("type", "type is required").notEmpty(),

//   // user_id
//   body("type", "type is required").notEmpty(),
];