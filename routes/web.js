const router = require("express").Router();

const loginRender = require("../controllers/webController/login");
const homeRender = require("../controllers/webController/home");
const notiRender = require("../controllers/webController/notification");
const messageRender = require("../controllers/webController/message");

const airRender = require("../controllers/webController/air");
const usersRender = require("../controllers/webController/users");
const postsRender = require("../controllers/webController/posts");
const filesRender = require("../controllers/webController/files");

const profileRender = require("../controllers/webController/profile");

const initAPIRoute = (app) => {
  /**
   * @description ACCOUNT ROUTES
   */
  router.get("/login", loginRender.getLoginPage);
  /**
   * @description DASHBOARD ROUTES
   */
  router.get("/dashboard/home", homeRender.getHomePage);
  router.get("/dashboard/notification", notiRender.getNotiPage);
  router.get("/dashboard/message", messageRender.getMessPage);
  /**
   * @description MANAGEMENT ROUTES
   */
  // Air
  router.get("/management/env-data/stations/air", airRender.getAirPage);
  router.post("/management/env-data/stations/air/datatables", airRender.fetchDataTables);

  router.get("/management/users", usersRender.getUsersPage);
  router.get("/management/posts", postsRender.getPostsPage);
  router.get("/management/files", filesRender.getFilesPage);
  /**
   * @description CONFIG ROUTES
   */
  router.get("/config/profile", profileRender.getProfilePage);
  /**
   * @description SUPPORT ROUTES
   */

  return app.use("/admin", router);
};

module.exports = initAPIRoute;
