/**
 * @description
 * css_path and script_path start from "pages" folder
 */
const User = require("../../models/UserModel");

const description = "Gis Web Management";

const profileRender = {
  // GET PROFILE EDIT PAGE
  getProfilePage: async (req, res) => {
    const current_user = req.currentUser;
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
      // page_required: false,
      page_required: {
        css_path: "config/profile/_css",
        script_path: "config/profile/_script",
      },
      description,
    };
    return res.render("pages/config/profile/profile.ejs", {
      locals,
      layout: "layouts/main",
      data: {
        current_user,
      },
    });
  },

  updateProfile: async (req, res) => {
    try {
      const _id = req.currentUser._id;
      const { fullname, email, password } = req.body;
      const updateData = {
        fullname,
        email,
        password,
      };
      const user = await User.findById(_id);
      await user.updateOne({ $set: updateData }); // $set make unique value
      res.status(200).json("sucessfully");
    } catch {
      res.status(500).json(err);
    }
}


}

module.exports = profileRender;
