const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("contactUs", RegisterSchema);
