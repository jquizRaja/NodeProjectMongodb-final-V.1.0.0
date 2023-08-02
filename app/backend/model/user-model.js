const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: String,
});
//this is schema for google users to store in own db
const User = mongoose.model("user", userSchema);
module.exports = User;
