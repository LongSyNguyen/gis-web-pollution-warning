const mongoose = require("mongoose");

const News = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    href: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
  {
    collection: "news",
  }
);
module.exports = mongoose.model("News", News);
