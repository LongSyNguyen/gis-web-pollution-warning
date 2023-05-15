const axios = require("axios");
const ApiWeatherModel = require("../models/ApiWeatherModel");

const DISTRICTS = [
  { name: "Ba Đình", lat: 21.03468, lon: 105.81432 },
  { name: "Bắc Từ Liêm", lat: 21.06957, lon: 105.75357 },
  { name: "Cầu Giấy", lat: 21.02905, lon: 105.79136 },
  { name: "Chương Mỹ", lat: 20.95156, lon: 105.66992 },
  { name: "Đan Phượng", lat: 21.08628, lon: 105.67069 },
  { name: "Đông Anh", lat: 21.13617, lon: 105.83663 },
  { name: "Gia Lâm", lat: 21.02872, lon: 105.96788 },
  { name: "Hà Đông", lat: 20.97089, lon: 105.78785 },
  { name: "Hai Bà Trưng", lat: 21.00591, lon: 105.85748 },
  { name: "Hoài Đức", lat: 21.06271, lon: 105.73238 },
  { name: "Hoàn Kiếm", lat: 21.02839, lon: 105.85218 },
  { name: "Hoàng Mai", lat: 20.97483, lon: 105.85401 },
  { name: "Long Biên", lat: 21.03737, lon: 105.89182 },
  { name: "Mê Linh", lat: 21.18306, lon: 105.72182 },
  { name: "Mỹ Đức", lat: 20.70448, lon: 105.78413 },
  { name: "Nam Từ Liêm", lat: 21.01274, lon: 105.76592 },
  { name: "Phú Xuyên", lat: 20.73884, lon: 105.89735 },
  { name: "Phúc Thọ", lat: 21.09254, lon: 105.5292 },
  { name: "Quốc Oai", lat: 20.99127, lon: 105.59496 },
  { name: "Sóc Sơn", lat: 21.25874, lon: 105.84078 },
  { name: "Sơn Tây", lat: 21.14117, lon: 105.50492 },
  { name: "Tây Hồ", lat: 21.08091, lon: 105.81809 },
  { name: "Thạch Thất", lat: 21.08031, lon: 105.54601 },
  { name: "Thanh Oai", lat: 20.95854, lon: 105.7551 },
  { name: "Thanh Trì", lat: 20.92543, lon: 105.87266 },
  { name: "Thanh Xuân", lat: 20.99347, lon: 105.8143 },
  { name: "Thường Tín", lat: 20.87074, lon: 105.86057 },
  { name: "Ứng Hòa", lat: 20.72076, lon: 105.78011 },
];

const getWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution`;
  for (const district of DISTRICTS) {
    try {
      const response = await axios.get(url, {
        params: {
          lat: district.lat,
          lon: district.lon,
          appid: "aea8f48cc62acada70be71623f56f3eb",
        },
      });
      const { coord, list } = response.data;

      const airPollutionData = {
        location: {
          district_city: district.name,
          latitude: coord.lat,
          longitude: coord.lon,
        },
        date: {
          date_type: new Date(list[0].dt * 1000).toISOString(),
          string_type: new Date(list[0].dt * 1000).toISOString()
        },
        co: list[0].components.no,
        no2: list[0].components.no2,
        o3: list[0].components.o3,
        so2: list[0].components.so2,
        pm2_5: list[0].components.pm2_5,
        pm10: list[0].components.pm10,
      };
      await ApiWeatherModel.insertMany(airPollutionData);
    } catch (error) {
      console.log(error.message);
    }
  }
};

module.exports = getWeather;
