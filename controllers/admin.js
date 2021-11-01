const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/user");

exports.getAdmins = async (req, res) => {
  const admins = await Admin.find({ role: 2 }).select("-__v -role -password");
  res.send({ success: true, data: admins });
};

exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select(
      "-__v -role -password"
    );
    res.send({ success: true, data: admin });
  } catch {
    res.status(404).send({
      success: false,
      error: "admin not found!",
    });
  }
};

exports.loginAdmin = async (req, res) => {
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
          res.json({
            success: true,
            data: { admin: admin, token },
          });
        }
      );
    } else {
      res.status(400).json({ success: false, error: "invalid password!" });
    }
  } else {
    res.status(401).send({
      success: false,
      error: "admin does not exist!",
    });
  }
};