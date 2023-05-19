const ApiWeather = require("../../models/ApiWeatherModel");
const Aqi = require("../../helpers/aqi_calculator");
const checkDataType = require("../../helpers/check_dataType");

const openweathermapRender = {
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
          tag: "Open weather map",
          link: "/admin/management/env-data/open-api/openweathermap",
        },
      ],
      title: "Admin | Open weather map",
      page_required: {
        // css_path and script_path start from "pages" folder
        css_path: "management/env_data/open-api/openweathermap/_css",
        script_path: "management/env_data/open-api/openweathermap/_script",
      },
      description: "Gis Web Management",
    };

    return res.render(
      "pages/management/env_data/open-api/openweathermap/openweathermap.ejs",
      {
        locals,
        layout: "layouts/main",
      }
    );
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
              { "location.district_city": { $regex: searchValue, $options: "i" } },
              { "location.latitude": searchValue, expectedType: "Double" },
              { "location.longitude": searchValue, expectedType: "Double" },
              { "date.string_type": { $regex: searchValue, $options: "i" } },
            ];
          } else {
            if (checkDataType.isValidObjectId(searchValue)) {
              query.$or = [{ _id: searchValue }];
            } else {
              query.$or = [
                {
                  "location.district_city": {
                    $regex: searchValue,
                    $options: "i",
                  },
                },
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

        ApiWeather.countDocuments(query, function (err, totalCount) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
          }
          ApiWeather.find(query)
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
                district_city: item.location.district_city,
                latitude: item.location.latitude,
                longitude: item.location.longitude,
                date: item.date.string_type,
                o3: item.o3,
                pm2_5: item.pm2_5,
                pm10: item.pm10,
                co: item.co,
                so2: item.so2,
                no2: item.no2,
                aqi_o3: item.aqi.o3,
                aqi_pm2_5: item.aqi.pm2_5,
                aqi_pm10: item.aqi.pm10,
                aqi_co: item.aqi.co,
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

      case "delDataById":
        try {
          const id = req.body.actionId;
          await ApiWeather.findByIdAndDelete(id);
          res.status(200).json(id);
        } catch (error) {
          res.status(500).json(err);
        }

      default:
        break;
    }
  },
};

module.exports = openweathermapRender;
