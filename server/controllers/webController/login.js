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
};

module.exports = loginRender;
