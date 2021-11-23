// const mongoose = require("mongoose");

// const User = require("../models/user");
// // const Message = require("../models/message");

// const roomSchema = new mongoose.Schema({
//     name: { type: String, lowercase: true, unique: true },
//     topic: String,
//     users: [User._id],
//     messages: [messageSchema],
//     created_at: Date,
//     updated_at: { type: Date, default: Date.now },
// });

// const messageSchema = new mongoose.Schema({
//     room: roomSchema,
//     user: User._id,
//     message_body: String,
//     message_status:{type: Boolean, default: false},
//     created_at: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("MessageChat", messageSchema);

// module.exports = mongoose.model("RoomChat", roomSchema);

