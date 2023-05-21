const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const userAuth = {
  requireAuth: (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, "password");
      const _id = decoded._id;
      User.findById(_id, (err, user) => {
        if (err) {
          console.error(err);
        } else {
          req.currentUser = user;
          next();
        }
      });
    } else {
      res.redirect("/admin/login");
    }
  },
};

module.exports = userAuth;
