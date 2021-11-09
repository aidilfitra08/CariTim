const { body } = require("express-validator");

exports.createApplicantValidator = [
  // user_id
  body("user_id", "user_id is required").notEmpty(),

  // vacancy_id
  body("vacancy_id", "vacancy_id is required").notEmpty(),

  // message
  body("message", "message must be String").isString(),

  // amount
  body("amount", "amount is required")
  .isNumeric({
    min: 1,
    max: 3,
  })
  .optional({ checkNull: true }),

];

exports.updateApplicantValidator = [
  // message
  body("message", "message must be String").isString(),

  // amount
  body("amount", "amount is required")
  .isNumeric({
    min: 1,
    max: 3,
  })
  .optional({ checkNull: true }),
];