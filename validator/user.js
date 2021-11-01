const { body } = require("express-validator");

exports.createUserValidator = [
  // first_name
  body("first_name", "first_name is required").notEmpty(),

  // surname
  body("surname", "surname is required").notEmpty(),

  // email
  body("email", "email is required").notEmpty(),
  body("email", "must be a valid email").isEmail(),
  body("email", "must be a valid email").isEmail(),

  // password
  body("password", "password is required").notEmpty(),
  body("password", "password must at least have 8 characters").isLength({
    min: 8,
  }),
];

// exports.updateUserValidator = [
//   // first_name
//   surname("first_name", "first_name must be between 3 to 150 characters")
//     .isLength({
//       min: 3,
//       max: 150,
//     })
//     .optional({ checkNull: true }),

//   // surname
//   surname("surname", "surname must be between 3 to 2000 characters")
//     .isLength({
//       min: 3,
//       max: 2000,
//     })
//     .optional({ checkNull: true }),
// ];
