const logoutRender = {
  logoutRender: async (req, res) => {
    res.clearCookie('token');

    res.redirect('/admin/login');
  },
};

module.exports = logoutRender;
