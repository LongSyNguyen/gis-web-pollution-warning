const Air = require("../../models/AirModel");
const Aqi = require("../../helpers/aqi_calculator");
const calResultByAqi = require("../../helpers/result_calculator");

const airController = {
  testAqi: async (req, res) => {
    try {
      let responeData = {
        ...req.body,
        aqi: {
          aqi_co: Aqi.compute({
            value: req.body.co,
            type: "co",
          }),
          aqi_no2: Aqi.compute({
            value: req.body.no2,
            type: "no2",
          }),
          aqi_o3: Aqi.compute({
            value: req.body.o3,
            type: "o3",
          }),
          aqi_so2: Aqi.compute({
            value: req.body.so2,
            type: "so2",
          }),
          aqi_tsp: Aqi.compute({
            value: req.body.tsp,
            type: "tsp",
          }),
          aqi_pm2_5: Aqi.compute({
            value: req.body.pm2_5,
            type: "pm2_5",
          }),
          aqi_pm10: Aqi.compute({
            value: req.body.so2,
            type: "pm10",
          }),
        },
      };
      res.status(200).json(responeData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

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
      const data = await Air.find().sort({ date: 1 }).exec();
      const formattedData = [];

      for (const item of data) {
        const date = new Date(item.date);
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
    } catch (error) {
      res.status(500).json(error);
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



