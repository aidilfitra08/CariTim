const { body } = require("express-validator");

exports.loginValidator = [
  // email
  body("email", "email is required").notEmpty(),

  // password
  body("password", "password is required").notEmpty(),
];

exports.createUserValidator = [
  // first_name
  body("first_name", "first_name is required").notEmpty(),
  body("first_name", "first_name must be a String").isString(),

  // surname
  body("surname", "surname is required").notEmpty(),
  body("surname", "surname must be a String").isString(),

  // email
  body("email", "email is required").notEmpty(),
  body("email", "must be a valid email").isEmail(),

  // password
  body("password", "password is required").notEmpty(),
  body("surname", "password must be a String").isString(),
  body("password", "password must at least have 8 characters").isLength({
    min: 8,
  }),
];

exports.updateUserValidator = [
  // first_name
  body("first_name", "first_name must be a String")
    .isString()
    .optional({ checkNull: true }),

  // surname
  body("surname", "surname must be a String")
    .isString()
    .optional({ checkNull: true }),

  // email
  body("email", "email cannot be changed").custom((value, {req}) => {
    if (Object.keys(req.body) == 'email') {
      throw new Error();
    }
    return true;
  }),

  // password
  body("password", "password must at least have 8 characters")
    .isLength({
      min: 8,
    })
    .optional({ checkNull: true }),

  // phone_number
  body("phone_number", "phone_number must be a String")
    .isString()
    .optional({ checkNull: true }),

  // gender
  body("gender", "gender must be 'L' or 'P'")
    .isIn(["L", "P"])
    .optional({ checkNull: true }),

  // address
  body("address", "address must be a String")
    .isString()
    .optional({ checkNull: true }),

  // job
  body("job", "job must be a String").isString().optional({ checkNull: true }),

  // institution
  body("institution", "institution must be a String")
    .isString()
    .optional({ checkNull: true }),

  // about
  body("about", "about must be a String")
    .isString()
    .optional({ checkNull: true }),

  // profile_picture
  body("profile_picture", "profile_picture must be a valid URL")
    .isURL()
    .optional({ checkNull: true }),
];
