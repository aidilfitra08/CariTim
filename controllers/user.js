const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const macro = require("../macro");

const User = require("../models/user");
const otpController = require("./otp");

exports.createUser = async (req, res) => {
  macro.checkValidation(req, res);

  const user = new User(req.body);

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);

  user.role = 1;
  user.email_confirmed = false;

  try {
    await user.save();
  } catch (error) {
    macro.failResponse(res, error.message, 500);
  }

  user.password = undefined;
  otpController.emailOtp(req, res);

  macro.successResponse(res, {
    user,
    message: "the otp code has been sent to your email",
  });
};

exports.getUsers = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  const users = await User.find({ role: 1 }).select("-__v -role -password");
  macro.successResponse(res, users);
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-__v -role -password"
    );
    macro.successResponse(res, user);
  } catch {
    macro.failResponse(res, "user not found", 404);
  }
};

exports.updateUser = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  macro.checkValidation(req, res);

  try {
    const user = await User.findById(req.params.id);

    if (req.body.password != undefined) {
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    Object.assign(user, req.body);
    await user.save();
    macro.successResponse(res, user);
  } catch {
    macro.failResponse(res, "user not found", 404);
  }
};

exports.deleteUser = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  try {
    const user = await User.findById(req.params.id);
    await user.remove();
    macro.successResponse(
      res,
      "user with id = ".concat(req.params.id).concat(" has been deleted")
    );
  } catch (err) {
    macro.failResponse(res, "user not found", 404);
    // macro.failResponse(res, err.message, 500);
  }
};

exports.loginUser = async (req, res) => {
  macro.checkValidation(req, res);

  const body = req.body;
  const password = await User.findOne({ email: body.email }).select("password");
  const user = await User.findOne({ email: body.email }).select(
    "-__v -password -role"
  );

  if (user) {
    if (user.email_confirmed != true)
      macro.failResponse(res, "account is not verified", 403);
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(
      body.password,
      password.password
    );
    if (validPassword) {
      jwt.sign(
        { user },
        process.env.SECRET_KEY,
        { expiresIn: "30d" },
        (err, token) => {
          macro.successResponse(res, { user: user, token });
        }
      );
    } else {
      macro.failResponse(res, "invalid password", 500);
    }
  } else {
    macro.failResponse(res, "user does not exist", 500);
  }
};
