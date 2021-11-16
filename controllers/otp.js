const nodemailer = require("nodemailer");
const macro = require("../macro");
const Otp = require("../models/otp");
const User = require("../models/user");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: "dev.caritim@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

exports.emailOtp = async (req, res) => {
  macro.checkValidation(req, res);

  const user = await User.findOne({ email: req.body.email }).select();
  if (!user) macro.failResponse(res, "email not exist in database", 404);
  if (user.email_confirmed === true)
    macro.failResponse(res, "email already been verified", 500);

  const oldOtp = await Otp.findOne({ email: req.body.email }).select();
  if (oldOtp) oldOtp.remove();

  let code = Math.floor(100000 + Math.random() * 900000);
  code = parseInt(code);

  // send mail with defined transport object
  var mailOptions = {
    to: req.body.email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      code +
      "</h1>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      macro.failResponse(res, error.message, 500);
    }
  });

  const otp = new Otp();
  otp.code = code;
  otp.type = "email";
  otp.email = req.body.email;

  try {
    await otp.save();
  } catch (error) {
    macro.failResponse(res, error.message, 500);
  }

  macro.successResponse(
    res,
    "the otp code has been sent to ".concat(req.body.email)
  );
};

exports.verifyAccount = async (req, res) => {
  macro.checkValidation(req, res);

  try {
    const otp = await Otp.findOne({
      code: req.body.code,
      type: "email",
    }).select();
    const user = await User.findOne({ email: otp.email }).select();

    user.email_confirmed = true;
    user.save();

    await otp.remove();

    macro.successResponse(
      res,
      "account with email '".concat(otp.email).concat("' has been verified")
    );
  } catch (error) {
    macro.failResponse(res, "otp code is incorrect", 500);
  }
};
