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
  { name: "Thành phố Phủ Lý", lat: 20.467330, lon: 105.930799},
  { name: "Thanh Liêm", lat: 20.540254, lon: 105.91571 },
  { name: "Bình Lục", lat: 20.503553, lon: 106.040921 },
  { name: "Duy Tiên", lat: 20.634471, lon: 105.963506 },
  { name: "Lý Nhân", lat: 20.568026, lon: 106.098202 },
  { name: "Kim Bảng", lat: 20.551834 , lon: 105.834574 },
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
          latitude: district.lat,
          longitude: district.lon,
        },
        date: {
          date_type: new Date(list[0].dt * 1000).toISOString(),
          string_type: new Date(list[0].dt * 1000).toISOString(),
        },
        co: list[0].components.no,
        no2: list[0].components.no2,
        o3: list[0].components.o3,
        so2: list[0].components.so2,
        pm2_5: list[0].components.pm2_5,
        pm10: list[0].components.pm10,
      };
      // await ApiWeatherModel.insertMany(airPollutionData);
      const test=[{
        location: {
          district_city: 'Ba Đình',
          latitude: 21.03468,
          longitude: 105.81432
        },
        date: {
          date_type: '2023-07-28T01:56:59.000Z',
          string_type: '2023-07-28T01:56:59.000Z'
        },
        co: 0.28,
        no2: 22.62,
        o3: 17.35,
        so2: 11.92,
        pm2_5: 41.72,
        pm10: 48.76
      }
      ,{
        location: {
          district_city: 'Bắc Từ Liêm',
          latitude: 21.06957,
          longitude: 105.75357
        },
        date: {
          date_type: '2023-07-28T01:53:59.000Z',
          string_type: '2023-07-28T01:53:59.000Z'
        },
        co: 0.55,
        no2: 40.78,
        o3: 10.73,
        so2: 22.65,
        pm2_5: 69.37,
        pm10: 78.65
      }
      ,{
        location: {
          district_city: 'Cầu Giấy',
          latitude: 21.02905,
          longitude: 105.79136
        },
        date: {
          date_type: '2023-07-28T01:57:00.000Z',
          string_type: '2023-07-28T01:57:00.000Z'
        },
        co: 0.55,
        no2: 40.78,
        o3: 10.73,
        so2: 22.65,
        pm2_5: 69.37,
        pm10: 78.65
      }
      ,{
        location: {
          district_city: 'Chương Mỹ',
          latitude: 20.95156,
          longitude: 105.66992
        },
        date: {
          date_type: '2023-07-28T01:57:59.000Z',
          string_type: '2023-07-28T01:57:59.000Z'
        },
        co: 6.2,
        no2: 85.68,
        o3: 0.33,
        so2: 46.25,
        pm2_5: 119.11,
        pm10: 131.51
      }
      ,{
        location: {
          district_city: 'Đan Phượng',
          latitude: 21.08628,
          longitude: 105.67069
        },
        date: {
          date_type: '2023-07-28T01:58:00.000Z',
          string_type: '2023-07-28T01:58:00.000Z'
        },
        co: 0.55,
        no2: 40.78,
        o3: 10.73,
        so2: 22.65,
        pm2_5: 69.37,
        pm10: 78.65
      }
      ,{
        location: {
          district_city: 'Đông Anh',
          latitude: 21.13617,
          longitude: 105.83663
        },
        date: {
          date_type: '2023-07-28T01:58:00.000Z',
          string_type: '2023-07-28T01:58:00.000Z'
        },
        co: 0.28,
        no2: 22.62,
        o3: 17.35,
        so2: 11.92,
        pm2_5: 41.72,
        pm10: 48.76
      }
      ,{
        location: {
          district_city: 'Gia Lâm',
          latitude: 21.02872,
          longitude: 105.96788
        },
        date: {
          date_type: '2023-07-28T01:58:01.000Z',
          string_type: '2023-07-28T01:58:01.000Z'
        },
        co: 0.28,
        no2: 22.62,
        o3: 17.35,
        so2: 11.92,
        pm2_5: 41.72,
        pm10: 48.76
      }
      ,{
        location: {
          district_city: 'Hà Đông',
          latitude: 20.97089,
          longitude: 105.78785
        },
        date: {
          date_type: '2023-07-28T01:58:01.000Z',
          string_type: '2023-07-28T01:58:01.000Z'
        },
        co: 6.2,
        no2: 85.68,
        o3: 0.33,
        so2: 46.25,
        pm2_5: 119.11,
        pm10: 131.51
      }
      ,{
        location: {
          district_city: 'Hai Bà Trưng',
          latitude: 21.00591,
          longitude: 105.85748
        },
        date: {
          date_type: '2023-07-28T01:58:02.000Z',
          string_type: '2023-07-28T01:58:02.000Z'
        },
        co: 0.28,
        no2: 22.62,
        o3: 17.35,
        so2: 11.92,
        pm2_5: 41.72,
        pm10: 48.76
      }
      ,{
        location: {
          district_city: 'Hoài Đức',
          latitude: 21.06271,
          longitude: 105.73238
        },
        date: {
          date_type: '2023-07-28T01:58:03.000Z',
          string_type: '2023-07-28T01:58:03.000Z'
        },
        co: 0.55,
        no2: 40.78,
        o3: 10.73,
        so2: 22.65,
        pm2_5: 69.37,
        pm10: 78.65
      }
      ,{
        location: {
          district_city: 'Hoàn Kiếm',
          latitude: 21.02839,
          longitude: 105.85218
        },
        date: {
          date_type: '2023-07-28T01:58:03.000Z',
          string_type: '2023-07-28T01:58:03.000Z'
        },
        co: 0.28,
        no2: 22.62,
        o3: 17.35,
        so2: 11.92,
        pm2_5: 41.72,
        pm10: 48.76
      }
      ,{
        location: {
          district_city: 'Hoàng Mai',
          latitude: 20.97483,
          longitude: 105.85401
        },
        date: {
          date_type: '2023-07-28T01:58:04.000Z',
          string_type: '2023-07-28T01:58:04.000Z'
        },
        co: 33.08,
        no2: 59.63,
        o3: 0.2,
        so2: 57.7,
        pm2_5: 107.14,
        pm10: 117.01
      }
      ,{
        location: {
          district_city: 'Long Biên',
          latitude: 21.03737,
          longitude: 105.89182
        },
        date: {
          date_type: '2023-07-28T01:59:02.000Z',
          string_type: '2023-07-28T01:59:02.000Z'
        },
        co: 0.28,
        no2: 22.62,
        o3: 17.35,
        so2: 11.92,
        pm2_5: 41.72,
        pm10: 48.76
      }
      ,{
        location: {
          district_city: 'Mê Linh',
          latitude: 21.18306,
          longitude: 105.72182
        },
        date: {
          date_type: '2023-07-28T01:59:02.000Z',
          string_type: '2023-07-28T01:59:02.000Z'
        },
        co: 0.55,
        no2: 40.78,
        o3: 10.73,
        so2: 22.65,
        pm2_5: 69.37,
        pm10: 78.65
      }
      ,{
        location: { district_city: 'Mỹ Đức', latitude: 20.70448, longitude: 105.78413 },
        date: {
          date_type: '2023-07-28T01:59:03.000Z',
          string_type: '2023-07-28T01:59:03.000Z'
        },
        co: 0.01,
        no2: 20.74,
        o3: 41.13,
        so2: 14.54,
        pm2_5: 93.86,
        pm10: 102.29
      }
      ,{
        location: {
          district_city: 'Nam Từ Liêm',
          latitude: 21.01274,
          longitude: 105.76592
        },
        date: {
          date_type: '2023-07-28T01:59:03.000Z',
          string_type: '2023-07-28T01:59:03.000Z'
        },
        co: 0.55,
        no2: 40.78,
        o3: 10.73,
        so2: 22.65,
        pm2_5: 69.37,
        pm10: 78.65
      }
      ,{
        location: {
          district_city: 'Phú Xuyên',
          latitude: 20.73884,
          longitude: 105.89735
        },
        date: {
          date_type: '2023-07-28T01:59:04.000Z',
          string_type: '2023-07-28T01:59:04.000Z'
        },
        co: 6.59,
        no2: 76.77,
        o3: 0.72,
        so2: 58.17,
        pm2_5: 124.26,
        pm10: 134.15
      }
      ,{
        location: {
          district_city: 'Phúc Thọ',
          latitude: 21.09254,
          longitude: 105.5292
        },
        date: {
          date_type: '2023-07-28T01:59:04.000Z',
          string_type: '2023-07-28T01:59:04.000Z'
        },
        co: 0.82,
        no2: 57.58,
        o3: 3.93,
        so2: 27.18,
        pm2_5: 136.95,
        pm10: 148.03
      }
      ,{
        location: {
          district_city: 'Quốc Oai',
          latitude: 20.99127,
          longitude: 105.59496
        },
        date: {
          date_type: '2023-07-28T01:59:05.000Z',
          string_type: '2023-07-28T01:59:05.000Z'
        },
        co: 0.01,
        no2: 21.94,
        o3: 37.19,
        so2: 9.3,
        pm2_5: 79.39,
        pm10: 85.02
      }
      ,{
        location: {
          district_city: 'Sóc Sơn',
          latitude: 21.25874,
          longitude: 105.84078
        },
        date: {
          date_type: '2023-07-28T01:59:06.000Z',
          string_type: '2023-07-28T01:59:06.000Z'
        },
        co: 0.04,
        no2: 13.2,
        o3: 24.68,
        so2: 7.99,
        pm2_5: 37.59,
        pm10: 42.93
      }
      ,{
        location: {
          district_city: 'Sơn Tây',
          latitude: 21.14117,
          longitude: 105.50492
        },
        date: {
          date_type: '2023-07-28T01:52:22.000Z',
          string_type: '2023-07-28T01:52:22.000Z'
        },
        co: 0.82,
        no2: 57.58,
        o3: 3.93,
        so2: 27.18,
        pm2_5: 136.95,
        pm10: 148.03
      }
      ,{
        location: { district_city: 'Tây Hồ', latitude: 21.08091, longitude: 105.81809 },
        date: {
          date_type: '2023-07-28T01:59:06.000Z',
          string_type: '2023-07-28T01:59:06.000Z'
        },
        co: 0.28,
        no2: 22.62,
        o3: 17.35,
        so2: 11.92,
        pm2_5: 41.72,
        pm10: 48.76
      }
      ,{
        location: {
          district_city: 'Thạch Thất',
          latitude: 21.08031,
          longitude: 105.54601
        },
        date: {
          date_type: '2023-07-28T01:59:07.000Z',
          string_type: '2023-07-28T01:59:07.000Z'
        },
        co: 0.82,
        no2: 57.58,
        o3: 3.93,
        so2: 27.18,
        pm2_5: 136.95,
        pm10: 148.03
      }
      ,{
        location: {
          district_city: 'Thanh Oai',
          latitude: 20.95854,
          longitude: 105.7551
        },
        date: {
          date_type: '2023-07-28T01:59:07.000Z',
          string_type: '2023-07-28T01:59:07.000Z'
        },
        co: 6.2,
        no2: 85.68,
        o3: 0.33,
        so2: 46.25,
        pm2_5: 119.11,
        pm10: 131.51
      }
      ,{
        location: {
          district_city: 'Thanh Trì',
          latitude: 20.92543,
          longitude: 105.87266
        },
        date: {
          date_type: '2023-07-28T01:59:08.000Z',
          string_type: '2023-07-28T01:59:08.000Z'
        },
        co: 33.08,
        no2: 59.63,
        o3: 0.2,
        so2: 57.7,
        pm2_5: 107.14,
        pm10: 117.01
      }
      ,{
        location: {
          district_city: 'Thanh Xuân',
          latitude: 20.99347,
          longitude: 105.8143
        },
        date: {
          date_type: '2023-07-28T01:59:08.000Z',
          string_type: '2023-07-28T01:59:08.000Z'
        },
        co: 33.08,
        no2: 59.63,
        o3: 0.2,
        so2: 57.7,
        pm2_5: 107.14,
        pm10: 117.01
      }
      ,{
        location: {
          district_city: 'Thường Tín',
          latitude: 20.87074,
          longitude: 105.86057
        },
        date: {
          date_type: '2023-07-28T01:54:04.000Z',
          string_type: '2023-07-28T01:54:04.000Z'
        },
        co: 33.08,
        no2: 59.63,
        o3: 0.2,
        so2: 57.7,
        pm2_5: 107.14,
        pm10: 117.01
      }
      ,{
        location: {
          district_city: 'Ứng Hòa',
          latitude: 20.72076,
          longitude: 105.78011
        },
        date: {
          date_type: '2023-07-28T01:59:09.000Z',
          string_type: '2023-07-28T01:59:09.000Z'
        },
        co: 0.01,
        no2: 20.74,
        o3: 41.13,
        so2: 14.54,
        pm2_5: 93.86,
        pm10: 102.29
      }
      ,{
        location: {
          district_city: 'Thành phố Phủ Lý',
          latitude: 20.46733,
          longitude: 105.930799
        },
        date: {
          date_type: '2023-07-28T01:59:10.000Z',
          string_type: '2023-07-28T01:59:10.000Z'
        },
        co: 0.2,
        no2: 31.19,
        o3: 8.32,
        so2: 15.26,
        pm2_5: 106.07,
        pm10: 117.49
      }
      ,{
        location: {
          district_city: 'Thanh Liêm',
          latitude: 20.540254,
          longitude: 105.91571
        },
        date: {
          date_type: '2023-07-28T01:59:10.000Z',
          string_type: '2023-07-28T01:59:10.000Z'
        },
        co: 0.2,
        no2: 31.19,
        o3: 8.32,
        so2: 15.26,
        pm2_5: 106.07,
        pm10: 117.49
      }
      ,{
        location: {
          district_city: 'Bình Lục',
          latitude: 20.503553,
          longitude: 106.040921
        },
        date: {
          date_type: '2023-07-28T01:59:11.000Z',
          string_type: '2023-07-28T01:59:11.000Z'
        },
        co: 1.19,
        no2: 45.93,
        o3: 3.98,
        so2: 25.99,
        pm2_5: 95.01,
        pm10: 104.82
      }
      ,{
        location: {
          district_city: 'Duy Tiên',
          latitude: 20.634471,
          longitude: 105.963506
        },
        date: {
          date_type: '2023-07-28T01:59:11.000Z',
          string_type: '2023-07-28T01:59:11.000Z'
        },
        co: 6.59,
        no2: 76.77,
        o3: 0.72,
        so2: 58.17,
        pm2_5: 124.26,
        pm10: 134.15
      }
      ,{
        location: {
          district_city: 'Lý Nhân',
          latitude: 20.568026,
          longitude: 106.098202
        },
        date: {
          date_type: '2023-07-28T01:59:12.000Z',
          string_type: '2023-07-28T01:59:12.000Z'
        },
        co: 1.19,
        no2: 45.93,
        o3: 3.98,
        so2: 25.99,
        pm2_5: 95.01,
        pm10: 104.82
      }
      ,{
        location: {
          district_city: 'Kim Bảng',
          latitude: 20.551834,
          longitude: 105.834574
        },
        date: {
          date_type: '2023-07-28T01:59:13.000Z',
          string_type: '2023-07-28T01:59:13.000Z'
        },
        co: 0.2,
        no2: 31.19,
        o3: 8.32,
        so2: 15.26,
        pm2_5: 106.07,
        pm10: 117.49
      }]
      // console.log("OpenWeatherMap-GET", airPollutionData);
      await ApiWeatherModel.insertMany(test)
    } catch (error) {
      console.log(error.message);
    }
  }
};

module.exports = getWeather;
