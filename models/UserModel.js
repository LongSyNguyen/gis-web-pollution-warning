const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
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
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);
module.exports = User;
