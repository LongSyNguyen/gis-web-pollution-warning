const mongoose = require("mongoose");
const Aqi = require("../helpers/aqi_calculator");

const apiWeatherSchema = new mongoose.Schema({
  location: {
    district_city: {
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
  o3: {
    type: Number,
    required: true,
  },
  pm2_5: {
    type: Number,
    required: true,
  },
  pm10: {
    type: Number,
    required: true,
  },
  co: {
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
    o3: {
      type: Number,
      default: function () {
        let data = {
          value: this.o3,
          type: "o3",
        };
        let aqi = Aqi.compute(data);
        return aqi;
      },
    },
    pm2_5: {
      type: Number,
      default: function () {
        let data = {
          value: this.pm2_5,
          type: "pm2_5",
        };
        let aqi = Aqi.compute(data);
        return aqi;
      },
    },
    pm10: {
      type: Number,
      default: function () {
        let data = {
          value: this.pm10,
          type: "pm10",
        };
        let aqi = Aqi.compute(data);
        return aqi;
      },
    },
    co: {
      type: Number,
      default: function () {
        let data = {
          value: this.co,
          type: "co",
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

module.exports = mongoose.model("apiweather", apiWeatherSchema);
