const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  myEmail: String,
  friends: [],
});

module.exports = mongoose.model("friend", FriendSchema);
