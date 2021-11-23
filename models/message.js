const mongoose = require("mongoose");

// const RoomChat = require("../models/room_chat");
// const User = require("../models/user");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const messageSchema = new mongoose.Schema({
    room: ObjectId,
    user: ObjectId,
    message_body: String,
    message_status:{type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MessageChat", messageSchema);