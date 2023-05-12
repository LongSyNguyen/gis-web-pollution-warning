/**
 * @description
 * css_path and script_path start from "pages" folder
 */

const description = "Gis Web Management";

const filesRender = {
  getFilesPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Quản trị",
          link: "/admin/home",
        },
        {
          tag: "Tệp tin",
          link: "#",
        },
      ],
      title: "Admin | Tệp tin",
      page_required: false,
      description,
    };
    return res.render("pages/management/files/files.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
};

module.exports = filesRender;
