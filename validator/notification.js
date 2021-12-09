const { body } = require("express-validator");

exports.createNotificationValidator = [
  // user_id
  body("user_id", "user_id  is required").notEmpty(),
  body("user_id", "user_id must be a String").isString(),

  // content
  body("content", "content is required").notEmpty(),
  body("content", "content must be a String").isString(),

  // status
  body("status", "status must be a Boolean").isBoolean().optional({ checkNull: true }),
];

exports.updateNotificationValidator = [
   // user_id
   body("user_id", "user_id must be a String").isString().optional({ checkNull: true }),
 
   // content
   body("content", "content must be a String").isString().optional({ checkNull: true }),
 
   // status
   body("status", "status must be a Boolean").isBoolean().optional({ checkNull: true }),
];
