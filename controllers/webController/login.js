const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");

const description = "Gis Web Management";

const loginRender = {
  // GET HOME PAGE
  getLoginPage: async (req, res) => {
    const locals = {
      title: "Admin | Đăng nhập",
      description,
    };
    return res.render("pages/login.ejs", {
      locals,
      layout: false,
    });
  },
  checkLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await User.findOne({ email, password });

      if (data) {
        var token = jwt.sign({ _id: data._id }, "password");
        return res.json({
          message: "Đăng nhập thành công",
          token: token
        })
      } else {
        res.status(300).json("Thông tin đăng nhập không hợp lệ");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = loginRender;
