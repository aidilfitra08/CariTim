const { validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Applicant = require("../models/applicant");

exports.createApplicant = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg,
  });

  // check for errors
  const errors = myValidationResult(req);
  // show errors
  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, error: errors.mapped() });
  }

  const applicant = new Applicant(req.body);

//   vacancy.date = new Date().getTime();

  try {
    await applicant.save();
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }

  res.send({ success: true, data: applicant });
};

exports.getApplicants = async (req, res) => {
  const applicant = await Applicant.find().select("-__v");
  res.send(applicant);

//   const posts = await Post.find().select("-__v");
//   res.send({ success: true, data: posts });
};

exports.getApplicantByUser = async (req, res) => {
  try {
    const applicant = await Applicant.find({user_id: req.params.id}).select(
      "-__v"
    );
    res.send(applicant);
  } catch {
    res.status(404).send({
      success: false,
      error: "applicant not found!",
    });
  }
};

exports.getApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id).select(
      "-__v"
    );
    res.send(applicant);
  } catch {
    res.status(404).send({
      success: false,
      error: "applicant not found!",
    });
  }
};

exports.updateApplicant = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

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
    const applicant = await Applicant.findById(req.params.id);
    Object.assign(applicant, req.body);
    await applicant.save();
    res.send({ success: true, data: applicant });
  } catch {
    res.status(404).send({
      success: false,
      error: "Applicant not found!",
    });
  }
};

exports.deleteApplicant = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  try {
    const applicant = await Applicant.findById(req.params.id);
    await applicant.remove();
    res.send({
      success: true,
      data: "applicant with id = ".concat(req.params.id).concat(" has been deleted"),
    });
  } catch {
    res.status(404).send({
      success: false,
      error: "applicant not found!",
    });
  }
};

