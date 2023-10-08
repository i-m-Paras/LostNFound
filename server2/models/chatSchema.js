const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  sender: String,

  reciver: String,
  chats: [
    {
      choice: Number,
      message: String,
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("chat", ChatSchema);
