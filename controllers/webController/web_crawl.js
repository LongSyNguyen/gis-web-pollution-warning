const News = require("../../models/NewsModel");
const checkDataType = require("../../helpers/check_dataType");

const webcrawlRender = {
  // GET ENVIRONMENT DATA MANAGEMENT PAGE
  getWebCrawlPage: async (req, res) => {
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
          tag: "Báo tài nguyên môi trường",
          link: "/management/env-data/web-crawl/baotainguyenmoitruong",
        },
      ],
      title: "Admin | Báo tài nguyên môi trường",
      page_required: {
        // css_path and script_path start from "pages" folder
        css_path: "management/env_data/web-crawl/baotainguyenmoitruong/_css",
        script_path:
          "management/env_data/web-crawl/baotainguyenmoitruong/_script",
      },
      description: "Gis Web Management",
    };

    return res.render(
      "pages/management/env_data/web-crawl/baotainguyenmoitruong/web-crawl.ejs",
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
              { "title": { $regex: searchValue, $options: "i" } },
              { "href": { $regex: searchValue, $options: "i" } },
            ];
          } else {
            if (checkDataType.isValidObjectId(searchValue)) {
              query.$or = [{ _id: searchValue }];
            } else {
              query.$or = [
              { "title": { $regex: searchValue, $options: "i" } },
              { "href": { $regex: searchValue, $options: "i" } },
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
        News.countDocuments(query, function (err, totalCount) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
          }
          News.find(query)
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
                title: item.title,
                href: item.href,
                date: item.date,
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
          await News.findByIdAndDelete(id);
          res.status(200).json(id);
        } catch (error) {
          res.status(500).json(err);
        }

      default:
        break;
    }
  },
};

module.exports = webcrawlRender;
