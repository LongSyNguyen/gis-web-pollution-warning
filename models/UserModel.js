const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
      min: 6,
      max: 100,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
  },
  {
    collection: "users",
  }
);
module.exports = mongoose.model("User", User);
