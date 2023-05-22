const mongoose = require("mongoose");
const Aqi = require("../helpers/aqi_calculator");

const airQualitySchema = new mongoose.Schema({
  location: {
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    commune: {
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
  },
  date: {
    date_type: {
      type: Date,
      required: true,
    },
    string_type: {
      type: String,
      required: true,
    },
  },
  tsp: {
    type: Number,
    required: true,
  },
  so2: {
    type: Number,
    required: true,
  },
  no2: {
    type: Number,
    required: true,
  },
  aqi: {
    tsp: {
      type: Number,
      default: function () {
        let data = {
          value: this.tsp,
          type: "tsp",
        };
        let aqi = Aqi.compute(data);
        return aqi;
      },
    },
    so2: {
      type: Number,
      default: function () {
        let data = {
          value: this.so2,
          type: "so2",
        };
        let aqi = Aqi.compute(data);
        return aqi;
      },
    },
    no2: {
      type: Number,
      default: function () {
        let data = {
          value: this.no2,
          type: "no2",
        };
        let aqi = Aqi.compute(data);
        return aqi;
      },
    },
  },
});
module.exports = mongoose.model("airQuality", airQualitySchema);
