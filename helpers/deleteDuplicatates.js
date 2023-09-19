const Air = require("../models/ApiWeatherModel");

const deleteDuplicatates = {
  airCollection: async (req, res, next) => {
    try {
      await Air.aggregate(
        [
          {
            $group: {
              _id: {
                longitude: "$location.longitude",
                latitude: "$location.latitude",
                date: "$date.date_type",
              },
              dups: {
                $push: "$_id",
              },
              count: {
                $sum: 1,
              },
            },
          },
          {
            $match: {
              count: { $gt: 1 },
            },
          },
        ],
        function (err, results) {
          if (err) throw err;
          results.forEach(function (result) {
            Air.deleteMany(
              { _id: { $in: result.dups.slice(1) } },
              function (err) {
                if (err) throw err;
                console.log(
                  "Deleted " +
                    (result.dups.length - 1) +
                    " duplicate documents."
                );
              }
            );
          });
        }
      );
      // res.status(200).json("Success Fully");
      console.log("successfully deleted")
    } catch (err) {
      // res.status(500).json({ message: err.message });
      console.log(err.message);
    }
  },
};

module.exports = deleteDuplicatates;
