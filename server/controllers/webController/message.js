/**
 * @description
 * css_path and script_path start from "pages" folder
 */

const description = "Gis Web Management";

const messageRender = {
  // GET MESSAGE PAGE
  getMessPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Bảng điều khiển",
          link: "/admin/home",
        },
        {
          tag: "Tin nhắn",
          link: "#",
        },
      ],
      title: "Admin | Tin nhắn",
      page_required: {
        css_path: "dashboard/message/_css",
        script_path: "dashboard/message/_script",
      },
      description,
    };
    return res.render("pages/dashboard/message/message.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
};

module.exports = messageRender;
