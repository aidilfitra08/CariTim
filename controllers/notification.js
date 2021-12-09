const Notification = require("../models/notification");
const macro = require("../macro");
const jwt = require("jsonwebtoken");

exports.createNotification = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  macro.checkValidation(req, res);

  const notification = new Notification(req.body);
  await notification.save();
  res.send({ success: true, data: notification });
};

exports.getNotifications = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  const notifications = await Notification.find().select("-__v");
  res.send({ success: true, data: notifications });
};

exports.getUserNotifications = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  try {
    const notification = await Notification.find({user_id: req.params.id}).select("-__v");
    res.send({ success: true, data: notification });
  } catch {
    res.status(404).send({
      success: false,
      error: "user not found!",
    });
  }
};

exports.getNotification = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  try {
    const notification = await Notification.findById(req.params.id).select("-__v");
    res.send({ success: true, data: notification });
  } catch {
    res.status(404).send({
      success: false,
      error: "notification not found!",
    });
  }
};

exports.updateNotification = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  macro.checkValidation(req, res);

  try {
    const notification = await Notification.findById(req.params.id).select("-__v");
    Object.assign(notification, req.body);
    notification.save();
    res.send({ success: true, data: notification });
  } catch {
    res.status(404).send({
      success: false,
      error: "notification not found!",
    });
  }
};

exports.deleteNotification = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      macro.failResponse(res, err.message, 403);
    }
  });

  try {
    const notification = await Notification.findById(req.params.id);
    await notification.remove();
    res.send({ success: true, data: "notification with id = ".concat(req.params.id).concat(" has been deleted")});
  } catch {
    res.status(404).send({
      success: false,
      error: "notification not found!",
    });
  }
};
