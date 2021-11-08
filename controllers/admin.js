const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const macro = require("../macro");
const Admin = require("../models/user");

exports.getAdmins = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  const admins = await Admin.find({ role: 2 }).select("-__v -role -password");
  macro.successResponse(res, admins);
};

exports.getAdmin = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message);
    }
  });

  try {
    const admin = await Admin.findById(req.params.id).select(
      "-__v -role -password"
    );
    macro.successResponse(res, admin);
  } catch {
    macro.failResponse(res, "admin not found", 404);
  }
};

exports.loginAdmin = async (req, res) => {
  macro.checkValidation(req, res);
  
  const body = req.body;
  const password = await Admin.findOne({ email: body.email,  role: 2 }).select("password");
  const admin = await Admin.findOne({ email: body.email,  role: 2 }).select("-__v -role -password");
  if (admin) {
    // check admin password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, password.password);
    if (validPassword) {
      jwt.sign(
        { admin },
        "la,dfmkgnbh2qeasdli1r138t7ghivbnwp",
        { expiresIn: "3h" },
        (err, token) => {
          macro.successResponse(res, { admin: admin, token });
        }
      );
    } else {
      macro.failResponse(res, "invalid password!", 500);
    }
  } else {
    macro.failResponse(res, "admin does not exist!", 500);
  }
};