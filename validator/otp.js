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

exports.changePasswordValidator = [
  // code
  body("code", "code is required").notEmpty(),
  body("code", "code must be a 6 digit Integer").isNumeric(),
  body("code", "code must be a 6 digit Integer").isLength().isLength({
    min: 6,
    max: 6,
  }),

  // new_password
  body("new_password", "new_password is required").notEmpty(),
  body("new_password", "new_password must be a String").isString(),
  body("new_password", "new_password must at least have 8 characters").isLength({
    min: 8,
  }),
];