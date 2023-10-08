const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HomePageSchema = new Schema({
  email: String,
  item: [{ itemName: String, itemPlace: String, itemImage: String }],
});

module.exports = mongoose.model("User-Item-Data", HomePageSchema);
