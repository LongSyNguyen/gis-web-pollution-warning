/**
 * @description
 * css_path and script_path start from "pages" folder
 */

const description = "Gis Web Management";

const homeRender = {
  // GET HOME PAGE
  getHomePage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Bảng điều khiển",
          link: "/admin/home",
        },
        {
          tag: "Trang chủ",
          link: "#",
        },
      ],
      title: "Admin | Trang chủ",
      page_required: {
        css_path: "dashboard/home/_css",
        script_path: "dashboard/home/_script",
      },
      description,
    };
    return res.render("pages/dashboard/home/home.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
};

module.exports = homeRender;
