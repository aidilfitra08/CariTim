const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Vacancy = require("../models/vacancy");

// exports.createUser = async (req, res) => {
//   const myValidationResult = validationResult.withDefaults({
//     formatter: (error) => error.msg,
//   });

//   // check for errors
//   const errors = myValidationResult(req);
//   // show errors
//   if (!errors.isEmpty()) {
//     return res.status(400).send({ success: false, error: errors.mapped() });
//   }

//   const user = new User(req.body);

//   // generate salt to hash password
//   const salt = await bcrypt.genSalt(10);
//   // now we set user password to hashed password
//   user.password = await bcrypt.hash(user.password, salt);

//   user.role = 1;

//   try {
//     await user.save();
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       error: error.message,
//     });
//   }

//   res.send({ success: true, data: user });
// };

exports.getVacancys = async (req, res) => {
  const vacancy = await Vacancy.find().select("-__v");
  res.send({ success: true, data: vacancy });

//   const posts = await Post.find().select("-__v");
//   res.send({ success: true, data: posts });
};

// exports.getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select(
//       "-__v -role -password"
//     );
//     res.send({ success: true, data: user });
//   } catch {
//     res.status(404).send({
//       success: false,
//       error: "user not found!",
//     });
//   }
// };

// exports.updateuser = async (req, res) => {
//   const myValidationResult = validationResult.withDefaults({
//     formatter: (error) => {
//       return error.msg;
//     },
//   });

//   // check for errors
//   const errors = myValidationResult(req);
//   // show errors
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       success: false,
//       error: errors.mapped(),
//     });
//   }

//   try {
//     const user = await user.findById(req.params.id).select("-__v");
//     Object.assign(user, req.body);
//     user.save();
//     res.send({ success: true, data: user });
//   } catch {
//     res.status(404).send({
//       success: false,
//       error: "user not found!",
//     });
//   }
// };

// exports.deleteuser = async (req, res) => {
//   try {
//     const user = await user.findById(req.params.id);
//     await user.remove();
//     res.send({
//       success: true,
//       data: "user with id = ".concat(req.params.id).concat(" has been deleted"),
//     });
//   } catch {
//     res.status(404).send({
//       success: false,
//       error: "user not found!",
//     });
//   }
// };

