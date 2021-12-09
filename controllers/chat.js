const { validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const macro = require("../macro");

const Messages = require("../models/message");
const Room = require("../models/room_chat");
const User = require("../models/user");

// API CLear
exports.createRoomChat = async (req, res) => {
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

  var decoded = jwt.verify(req.token, process.env.SECRET_KEY);
  console.log(decoded);
  const chatRoom = new Room(req.body);
  chatRoom.created_at = new Date().getTime();
  chatRoom.users = [
    user1 = decoded.user._id,
    user2 = req.body.receiver
  ]

  // const allMessages = await Messages.find(chatRoom.name).select("-__v");
  // chatRoom.messages = [
  //   allMessages
  // ]
//   chat.date = new Date().getTime();

  try {
    await chatRoom.save();
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }

  res.send({ success: true, data: chatRoom });
};


// API Clear
exports.createMessage = async (req, res) => {
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
      
      var decoded = jwt.verify(req.token, process.env.SECRET_KEY);
      console.log(decoded);

      const messages = new Messages(req.body);
      messages.user = decoded.user._id;
    //   message.user =

    //   chat.date = new Date().getTime();
    
      try {
        await messages.save();
      } catch (error) {
        res.status(500).send({
          success: false,
          error: error.message,
        });
      }
    
      res.send({ success: true, data: messages });
    };


// exports.updateVacancy = async (req, res) => {
//   jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
//     if (err) {
//       macro.failResponse(res, err.message, 403);
//     }
//   });

//   const myValidationResult = validationResult.withDefaults({
//     formatter: (error) => {
//       return error.msg;
//     },
//   });

//   // check for errors
//   const errors = myValidationResult(req);
//   // show errors
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       success: false,
//       error: errors.mapped(),
//     });
//   }

//   try {
//     const vacancy = await Vacancy.findById(req.params.id);
//     Object.assign(vacancy, req.body);
//     await vacancy.save();
//     res.send({ success: true, data: vacancy });
//   } catch {
//     res.status(404).send({
//       success: false,
//       error: "Vacancy not found!",
//     });
//   }
// };


//API ini ada cuma buat debugging
exports.getRoomChats = async (req, res) => {
  const room = await Room.find().select("-__v");
  res.send({ success: true, data: room });

//   const posts = await Post.find().select("-__v");
//   res.send({ success: true, data: posts });
};

//Buat get data chat
exports.getRoomChat = async (req, res) => {
    try {
      // var update_query = { _id: req.params.id };
      // var newvalues = {$set: {updated_at: Date.now()}};
      // Room.updateOne(update_query, newvalues);

      const room = await Room.findById(req.params.id).select("-__v");
      var query = { room: req.params.id };
      const allMessages = await Messages.find(query);
      Object.assign(room.messages, allMessages);
      
      
      // const update_now = new Date().getTime();
      // Object.assign(room.updated_at, update_now);

      await room.save();
      res.send({ success: true, data: room });
    } catch {
      res.status(404).send({
        success: false,
        error: "room not found!",
      });
    }
  };

// exports.getVacancy = async (req, res) => {
//   try {
//     const vacancy = await Vacancy.findById(req.params.id).select(
//       "-__v"
//     );
//     res.send({ success: true, data: vacancy });
//   } catch {
//     res.status(404).send({
//       success: false,
//       error: "vacancy not found!",
//     });
//   }
// };

// exports.updateVacancy = async (req, res) => {
//   jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
//     if (err) {
//       macro.failResponse(res, err.message, 403);
//     }
//   });

//   const myValidationResult = validationResult.withDefaults({
//     formatter: (error) => {
//       return error.msg;
//     },
//   });

//   // check for errors
//   const errors = myValidationResult(req);
//   // show errors
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       success: false,
//       error: errors.mapped(),
//     });
//   }

//   try {
//     const vacancy = await Vacancy.findById(req.params.id);
//     Object.assign(vacancy, req.body);
//     await vacancy.save();
//     res.send({ success: true, data: vacancy });
//   } catch {
//     res.status(404).send({
//       success: false,
//       error: "Vacancy not found!",
//     });
//   }
// };

// exports.deleteVacancy = async (req, res) => {
//   jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
//     if (err) {
//       macro.failResponse(res, err.message, 403);
//     }
//   });

//   try {
//     const vacancy = await Vacancy.findById(req.params.id);
//     await vacancy.remove();
//     res.send({
//       success: true,
//       data: "vacancy with id = ".concat(req.params.id).concat(" has been deleted"),
//     });
//   } catch {
//     res.status(404).send({
//       success: false,
//       error: "vacancy not found!",
//     });
//   }
// };

