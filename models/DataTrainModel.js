const mongoose = require("mongoose");

const dataTrainSechma = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  title: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  predict:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("data", dataTrainSechma);
