const { body } = require("express-validator");

exports.sendValidator = [
  // email
  body("email", "email is required").notEmpty(),
  body("email", "email must be a valid email").isEmail(),
];

exports.verifyValidator = [
  // code
  body("code", "code is required").notEmpty(),
  body("code", "code must be a 6 digit Integer").isNumeric(),
  body("code", "code must be a 6 digit Integer").isLength().isLength({
    min: 6,
    max: 6,
  }),
];
