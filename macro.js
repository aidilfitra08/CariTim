const { validationResult } = require("express-validator");

exports.failResponse = (res, error, status) => {
  return res.status(status).send({
    success: false,
    error: error,
  });
};

exports.successResponse = (res, data) => {
  return res.send({
    success: true,
    data: data,
  });
};

exports.checkValidation = (req, res) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg,
  });

  // check for errors
  const errors = myValidationResult(req);
  // show errors
  if (!errors.isEmpty()) {
    return res.status(500).send({ success: false, error: errors.mapped() });
  }
};
