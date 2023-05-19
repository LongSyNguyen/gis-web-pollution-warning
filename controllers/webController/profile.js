/**
 * @description
 * css_path and script_path start from "pages" folder
 */

const description = "Gis Web Management";

const profileRender = {
  // GET PROFILE EDIT PAGE
  getProfilePage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Cấu hình",
          link: "#",
        },
        {
          tag: "Tài khoản",
          link: "/admin/config/profile",
        },
      ],
      title: "Admin | Tài khoản",
      page_required: false,
      description,
    };
    return res.render("pages/config/profile/profile.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
};

module.exports = profileRender;
