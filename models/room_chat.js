const mongoose = require("mongoose");

// const User = require("../models/user");
// const Message = require("../models/message");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const roomSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true },
    // topic: String,
    users: [ObjectId],
    messages: [],
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RoomChat", roomSchema);

