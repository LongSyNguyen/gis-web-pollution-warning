/**
 * @description
 * css_path and script_path start from "pages" folder
 */
const description = "Gis Web Management";
const ApiWeather = require("../../models/ApiWeatherModel");

const openweathermapStatsRender = {
  // GET HOME PAGE
  getStatsPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Bảng điều khiển",
          link: "#",
        },
        {
          tag: "Thống kê",
          link: "#",
        },
        {
          tag: "Open weather map",
          link: "/admin/dashboard/stats/open-api/openweathermap",
        },
      ],
      title: "Admin | Thống kê",
      page_required: {
        css_path: "dashboard/stats/open-api/_css",
        script_path: "dashboard/stats/open-api/_script",
      },
      description,
    };

    const uniqueYearSet = new Set();
    const uniqueLocationSet = new Set();
    const data = {};

    ApiWeather.find().exec((err, result) => {
      result.map((item) => {
        uniqueYearSet.add(new Date(item.date.date_type).getFullYear());
        uniqueLocationSet.add(JSON.stringify(item.location));
      });
      // Chuyển đổi set thành array
      const uniqueYear = Array.from(uniqueYearSet);
      // sắp xếp năm từ lớn tới bé
      uniqueYear.sort((a, b) => b - a);
      // Chuyển đổi chuỗi JSON thành đối tượng ban đầu
      const uniqueLocation = Array.from(uniqueLocationSet).map((str) =>
        JSON.parse(str)
      );
      // Thêm phần tử vào data
      data.unique_years = uniqueYear;
      data.current_year = uniqueYear[0];
      data.total_location = uniqueLocation.length;
      data.all_unique_locations = uniqueLocation;

      return res.render(
        "pages/dashboard/stats/open-api/stats_openweathermap.ejs",
        {
          locals,
          layout: "layouts/main",
          data,
        }
      );
    });
  },
};

module.exports = openweathermapStatsRender;
