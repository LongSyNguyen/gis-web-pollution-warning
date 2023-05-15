const ApiWeather = require("../../models/ApiWeatherModel");
const Aqi = require("../../helpers/aqi_calculator");
const calResultByAqi = require("../../helpers/result_calculator");

const openweathermapController = {
  getAllAirInfor: async (req, res) => {
    try {
      ApiWeather.find().sort({ date: -1 }).exec(
        function(err, data) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
          }
          const formattedData = [];
          for (const item of data) {
            const formatDate = new Date(item.date.date_type);
    
            formattedData.push({
              _id: item._id,
              location: {
                district_city: item.location.district_city,
                latitude: item.location.latitude,
                longitude: item.location.longitude,
              },
              date: {
                iso: formatDate,
                year: formatDate.getFullYear(),
                month: formatDate.getMonth() + 1,
                day: formatDate.getDate(),
                hour: formatDate.getHours(),
                minute: formatDate.getMinutes(),
              },
              o3: {
                value: item.o3,
                aqi: item.aqi.o3,
                result: calResultByAqi(item.aqi.o3),
              },
              pm2_5: {
                value: item.pm2_5,
                aqi: item.aqi.pm2_5,
                result: calResultByAqi(item.aqi.pm2_5),
              },
              pm10: {
                value: item.pm10,
                aqi: item.aqi.pm10,
                result: calResultByAqi(item.aqi.pm10),
              },
              co: {
                value: item.co,
                aqi: item.aqi.co,
                result: calResultByAqi(item.aqi.co),
              },
              so2: {
                value: item.so2,
                aqi: item.aqi.so2,
                result: calResultByAqi(item.aqi.so2),
              },
              no2: {
                value: item.no2,
                aqi: item.aqi.no2,
                result: calResultByAqi(item.aqi.no2),
              },
            });
          }
          res.status(200).json(formattedData);
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },

  filterAirInfor: async (req, res) => {
    try {
      const { district_city, lat, long, current_date } = req.query;
      const { fromdate, todate } = req.query;

      var filter = {};
      if (district_city) {
        filter = {
          ...filter,
          "location.district_city": { $regex: district_city, $options: "i" },
        };
      }

      if (lat && long) {
        filter = {
          ...filter,
          "location.latitude": parseFloat(lat),
          "location.longitude": parseFloat(long),
        };
      }

      if (fromdate && todate) {
        filter = {
          ...filter,
          "date.date_type": {
            $gte: new Date(fromdate),
            $lte: new Date(todate),
          },
        };
      }

      if (current_date) {
        const today = new Date();
        switch (current_date) {
          case "day":
            filter = {
              ...filter,
              $expr: {
                $and: [
                  {
                    $eq: [{ $dayOfMonth: "$date.date_type" }, today.getDate()],
                  },
                  {
                    $eq: [{ $month: "$date.date_type" }, today.getMonth() + 1],
                  },
                  { $eq: [{ $year: "$date.date_type" }, today.getFullYear()] },
                ],
              },
            };
            break;
          case "month":
            filter = {
              ...filter,
              $expr: {
                $and: [
                  {
                    $eq: [{ $month: "$date.date_type" }, today.getMonth() + 1],
                  },
                  { $eq: [{ $year: "$date.date_type" }, today.getFullYear()] },
                ],
              },
            };
            break;
          case "year":
            filter = {
              ...filter,
              $expr: {
                $and: [
                  { $eq: [{ $year: "$date.date_type" }, today.getFullYear()] },
                ],
              },
            };
            break;
          default:
            filter = {
              ...filter,
            };
        }
      }

      ApiWeather.find(filter).sort({ "date.date_type": -1 }).exec(function (err, data) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err });
        }
        const formattedData = [];
        for (const item of data) {
          const formatDate = new Date(item.date.date_type);
          formattedData.push({
            _id: item._id,
            location: {
              district_city: item.location.district_city,
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            },
            date: {
              iso: formatDate,
              year: formatDate.getFullYear(),
              month: formatDate.getMonth() + 1,
              day: formatDate.getDate(),
              hour: formatDate.getHours(),
              minute: formatDate.getMinutes(),
            },
            o3: {
              value: item.o3,
              aqi: item.aqi.o3,
              result: calResultByAqi(item.aqi.o3),
            },
            pm2_5: {
              value: item.pm2_5,
              aqi: item.aqi.pm2_5,
              result: calResultByAqi(item.aqi.pm2_5),
            },
            pm10: {
              value: item.pm10,
              aqi: item.aqi.pm10,
              result: calResultByAqi(item.aqi.pm10),
            },
            co: {
              value: item.co,
              aqi: item.aqi.co,
              result: calResultByAqi(item.aqi.co),
            },
            so2: {
              value: item.so2,
              aqi: item.aqi.so2,
              result: calResultByAqi(item.aqi.so2),
            },
            no2: {
              value: item.no2,
              aqi: item.aqi.no2,
              result: calResultByAqi(item.aqi.no2),
            },
          });
        }
        res.status(200).json(formattedData);
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = openweathermapController;
