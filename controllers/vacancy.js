const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Vacancy = require("../models/vacancy");

exports.createVacancy = async (req, res) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg,
  });

  // check for errors
  const errors = myValidationResult(req);
  // show errors
  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, error: errors.mapped() });
  }

  const vacancy = new Vacancy(req.body);

  vacancy.date = new Date().getTime();

  try {
    await vacancy.save();
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }

  res.send({ success: true, data: vacancy });
};

exports.getVacancys = async (req, res) => {
  const vacancy = await Vacancy.find().select("-__v");
  res.send({ success: true, data: vacancy });

//   const posts = await Post.find().select("-__v");
//   res.send({ success: true, data: posts });
};

exports.getVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id).select(
      "-__v"
    );
    res.send({ success: true, data: vacancy });
  } catch {
    res.status(404).send({
      success: false,
      error: "vacancy not found!",
    });
  }
};

exports.updateVacancy = async (req, res) => {
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
    const vacancy = await Vacancy.findById(req.params.id);
    Object.assign(vacancy, req.body);
    await vacancy.save();
    res.send({ success: true, data: vacancy });
  } catch {
    res.status(404).send({
      success: false,
      error: "Vacancy not found!",
    });
  }
};

exports.deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);
    await vacancy.remove();
    res.send({
      success: true,
      data: "vacancy with id = ".concat(req.params.id).concat(" has been deleted"),
    });
  } catch {
    res.status(404).send({
      success: false,
      error: "vacancy not found!",
    });
  }
};

