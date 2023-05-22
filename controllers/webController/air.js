const Air = require("../../models/AirModel");
const Aqi = require("../../helpers/aqi_calculator");
const checkDataType = require("../../helpers/check_dataType");

const airRender = {
  // GET ENVIRONMENT DATA MANAGEMENT PAGE
  getAirPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Quản trị",
          link: "/admin/dashboard/home",
        },
        {
          tag: "Dữ liệu môi trường",
          link: "#",
        },
        {
          tag: "Dữ liệu không khí",
          link: "/admin/management/env-data/stations/air",
        },
      ],
      title: "Admin | Dữ liệu không khí",
      page_required: {
        // css_path and script_path start from "pages" folder
        css_path: "management/env_data/stations/air/_css",
        script_path: "management/env_data/stations/air/_script",
      },
      description: "Gis Web Management",
    };

    return res.render("pages/management/env_data/stations/air/air.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
  fetchDataTables: async (req, res) => {
    switch (req.body.actionType) {
      case "getAllData":
        const draw = req.body.draw;
        let start = parseInt(req.body.start);
        let length = parseInt(req.body.length);
        // check if user selected All
        if (length == -1) {
          length = 1000000000000000;
        }

        let query = {};
        if (req.body.search.value) {
          const searchValue = req.body.search.value;
          if (checkDataType.isNumber(searchValue)) {
            query.$or = [
              { "location.address": { $regex: searchValue, $options: "i" } },
              { "location.state": { $regex: searchValue, $options: "i" } },
              { "location.commune": { $regex: searchValue, $options: "i" } },
              { "location.latitude": searchValue, expectedType: "Double" },
              { "location.longitude": searchValue, expectedType: "Double" },
              { "date.string_type": { $regex: searchValue, $options: "i" } },
              { tsp: searchValue, expectedType: "Double" },
              { so2: searchValue, expectedType: "Double" },
              { no2: searchValue, expectedType: "Double" },
              { aqi: searchValue, expectedType: "Double" },
            ];
          } else {
            if (checkDataType.isValidObjectId(searchValue)) {
              query.$or = [{ _id: searchValue }];
            } else {
              query.$or = [
                { "location.state": { $regex: searchValue, $options: "i" } },
                {
                  "location.address": { $regex: searchValue, $options: "i" },
                },
                { "location.commune": { $regex: searchValue, $options: "i" } },
                { "date.string_type": { $regex: searchValue, $options: "i" } },
              ];
            }
          }
        }

        const sortQuery = {};
        if (req.body.order) {
          let columns = req.body.columns;
          let order = req.body.order;
          const sortColumn = columns[order[0].column].data;
          const sortDirection = order[0].dir === "asc" ? 1 : -1;
          sortQuery[sortColumn] = sortDirection;
        }

        Air.countDocuments(query, function (err, totalCount) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
          }
          Air.find(query)
            .sort(sortQuery)
            .skip(start)
            .limit(length)
            .exec(function (err, data) {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: err });
              }
              let i = 0;
              const formattedData = data.map((item) => ({
                index: (i += 1),
                _id: item._id,
                address: item.location.address,
                state: item.location.state,
                commune: item.location.commune,
                latitude: item.location.latitude,
                longitude: item.location.longitude,
                date: new Date(item.date.string_type),
                tsp: item.tsp,
                so2: item.so2,
                no2: item.no2,
                aqi_tsp: item.aqi.tsp,
                aqi_so2: item.aqi.so2,
                aqi_no2: item.aqi.no2,
              }));
              res.status(200).json({
                draw,
                recordsTotal: totalCount,
                recordsFiltered: totalCount,
                data: formattedData,
              });
            });
        });
        break;

      case "insertData":
        try {
          const newAir = new Air(req.body.actionData);
          const savedAir = await newAir.save();
          res.status(200).json(savedAir);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
        break;

      case "updateDataById":
        try {
          const id = req.body.actionData._id; // get the record need to update
          const aqi = {
            tsp: Aqi.compute({
              value: req.body.actionData.tsp,
              type: "tsp",
            }),
            so2: Aqi.compute({
              value: req.body.actionData.so2,
              type: "so2",
            }),
            no2: Aqi.compute({
              value: req.body.actionData.no2,
              type: "no2",
            }),
          };

          const updateValue = { ...req.body.actionData, aqi: aqi }; // create the new update value
          const air = await Air.findById(id); // get the old record
          await air.updateOne({ $set: updateValue }); // $set make unique value
          res.status(200).json({ ...updateValue, _id: id }); // return the update value
        } catch (error) {
          // res.status(500).json({ message: error });
          res.status(500).json("cac");
        }
        break;

      case "delDataById":
        try {
          const id = req.body.actionId;
          await Air.findByIdAndDelete(id);
          res.status(200).json(id);
        } catch (error) {
          res.status(500).json(err);
        }

      default:
        break;
    }
  },
};

module.exports = airRender;
