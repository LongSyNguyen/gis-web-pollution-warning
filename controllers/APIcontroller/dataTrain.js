const ApiTrain = require("../../models/DataTrainModel");

const dataTrainController = {
  getAllDataInfor: async (req, res) => {
    try {
      ApiTrain.find({}, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data);
          res.status(200).json(data);
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  filterDataInfor: async (req, res) => {
    try {
      const { name, latitude, longitude } = req.query;
      let filter = {};

      if (name) {
        filter["name"] = { $regex: name, $options: "i" };
      }

      if (latitude && longitude) {
        filter["latitude"] = parseFloat(latitude);
        filter["longitude"] = parseFloat(longitude);
      }

      ApiTrain.find(filter).exec(function (err, data) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err });
        }
        res.status(200).json(data);
        console.log(filter);
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = dataTrainController;
