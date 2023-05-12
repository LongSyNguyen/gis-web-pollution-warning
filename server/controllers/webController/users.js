/**
 * @description
 * css_path and script_path start from "pages" folder
 */

const description = "Gis Web Management";

const usersRender = {
  getUsersPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Quản trị",
          link: "/admin/dashboard/home",
        },
        {
          tag: "Thành viên",
          link: "#",
        },
      ],
      title: "Admin | Thành viên",
      page_required: {
        css_path: "management/users/_css",
        script_path: "management/users/_script",
      },
      description,
    };
    return res.render("pages/management/users/users.ejs", {
      locals,
      layout: "layouts/main",
    });
  }
};

module.exports = usersRender;
