const Air = require("../../models/AirModel");
const Aqi = require("../../helpers/aqi_calculator");

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
      const airs = await Air.find();
      res.status(200).json(airs);
    } catch (error) {
      res.status(500).json;
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



