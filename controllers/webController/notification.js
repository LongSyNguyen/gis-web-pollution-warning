/**
 * @description
 * css_path and script_path start from "pages" folder
 */

const description = "Gis Web Management";

const notiRender = {
  // GET NOTIFICATION PAGE
  getNotiPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Bảng điều khiển",
          link: "/admin/home",
        },
        {
          tag: "Thông báo",
          link: "#",
        },
      ],
      title: "Admin | Thông báo",
      page_required: {
        css_path: "dashboard/notification/_css",
        script_path: "dashboard/notification/_script",
      },
      description,
    };
    return res.render("pages/dashboard/notification/notification.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
};

module.exports = notiRender;
