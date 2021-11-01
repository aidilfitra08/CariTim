const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = async (req, res) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg,
  });

  // check for errors
  const errors = myValidationResult(req);
  // show errors
  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, error: errors.mapped() });
  }

  const user = new User(req.body);

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);

  user.role = 1;

  try {
    await user.save();
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }

  res.send({ success: true, data: user });
};

exports.getUsers = async (req, res) => {
  const users = await User.find({ role: 1 }).select("-__v -role -password");
  res.send({ success: true, data: users });
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-__v -role -password"
    );
    res.send({ success: true, data: user });
  } catch {
    res.status(404).send({
      success: false,
      error: "user not found!",
    });
  }
};

exports.updateuser = async (req, res) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return error.msg;
    },
  });

  // check for errors
  const errors = myValidationResult(req);
  // show errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.mapped(),
    });
  }

  try {
    const user = await user.findById(req.params.id).select("-__v");
    Object.assign(user, req.body);
    user.save();
    res.send({ success: true, data: user });
  } catch {
    res.status(404).send({
      success: false,
      error: "user not found!",
    });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const user = await user.findById(req.params.id);
    await user.remove();
    res.send({
      success: true,
      data: "user with id = ".concat(req.params.id).concat(" has been deleted"),
    });
  } catch {
    res.status(404).send({
      success: false,
      error: "user not found!",
    });
  }
};

exports.loginUser = async (req, res) => {
  const body = req.body;
  const password = await User.findOne({ email: body.email }).select("password");
  const user = await User.findOne({ email: body.email }).select("-__v -password -role");
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, password.password);
    if (validPassword) {
      jwt.sign(
        { user },
        "la,dfmkgnbh2qeasdli1r138t7ghivbnwp",
        { expiresIn: "3h" },
        (err, token) => {
          res.json({
            success: true,
            data: { user: user, token },
          });
        }
      );
    } else {
      res.status(400).json({ success: false, error: "invalid password!" });
    }
  } else {
    res.status(401).send({
      success: false,
      error: "user does not exist!",
    });
  }
};
