const Air = require("../../models/AirModel");
const Aqi = require("../../helpers/aqi_calculator");
const calResultByAqi = require("../../helpers/result_calculator");

const airController = {
  addAirInfo: async (req, res) => {
    try {
      const newAir = new Air(req.body);
      const savedAir = await newAir.save();
      res.status(200).json(savedAir);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addManyAirInfo: async (req, res, next) => {
    try {
      const airData = req.body;
      const savedAir = await Air.insertMany(airData);
      res.status(200).json(savedAir);
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllAirInfor: async (req, res) => {
    try {
      Air.find()
        .sort({ date: -1 })
        .exec(function (err, data) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
          }
          const formattedData = [];
          for (const item of data) {
            const date = new Date(item.date.date_type);
            formattedData.push({
              _id: item._id,
              location: {
                address: item.location.address,
                latitude: item.location.latitude,
                longitude: item.location.longitude,
                state: item.location.state,
              },
              date: {
                iso: date,
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
              },
              tsp: {
                value: item.tsp,
                aqi: item.aqi.tsp,
                result: calResultByAqi(item.aqi.tsp),
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
      res.status(500).json(error);
    }
  },

  filterAirInfor: async (req, res) => {
    try {
      const { address, state, lat, long, current_date } = req.query;
      const { fromdate, todate } = req.query;

      var filter = {};
      if (address) {
        filter = {
          ...filter,
          "location.address": { $regex: address, $options: "i" },
        };
      }

      if (state) {
        filter = {
          ...filter,
          "location.state": { $regex: state, $options: "i" },
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

      Air.find(filter)
        .sort({ "date.date_type": -1 })
        .exec(function (err, data) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
          }
          const formattedData = [];
          for (const item of data) {
            const date = new Date(item.date.date_type);
            formattedData.push({
              _id: item._id,
              location: {
                address: item.location.address,
                latitude: item.location.latitude,
                longitude: item.location.longitude,
                state: item.location.state,
              },
              date: {
                iso: date,
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
              },
              tsp: {
                value: item.tsp,
                aqi: item.aqi.tsp,
                result: calResultByAqi(item.aqi.tsp),
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
        });;
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAirInforById: async (req, res) => {
    try {
      const airRes = await Air.findById(req.params.id);
      res.status(200).json(airRes);
    } catch (error) {
      res.status(500).json;
    }
  },

  updateAirInforById: async (req, res) => {
    try {
      const id = req.params.id; // get the record need to update
      const aqi = {
        tsp: Aqi.compute({
          value: req.body.tsp,
          type: "tsp",
        }),
        so2: Aqi.compute({
          value: req.body.so2,
          type: "so2",
        }),
        no2: Aqi.compute({
          value: req.body.no2,
          type: "no2",
        }),
      };
      const updateValue = { ...req.body, aqi: aqi }; // create the new update value
      const air = await Air.findById(id); // get the old record
      await air.updateOne({ $set: updateValue }); // $set make unique value
      res.status(200).json({ ...updateValue, _id: id }); // return the update value
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  deleteAirInforById: async (req, res) => {
    try {
      const id = req.params.id;
      await Air.findByIdAndDelete(id);
      res.status(200).json(id);
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = airController;



