const router = require("express").Router();

const loginRender = require("../controllers/webController/login");
const homeRender = require("../controllers/webController/home");

const airRender = require("../controllers/webController/air");

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
  /**
   * @description MANAGEMENT ROUTES
   */
  // Air
  router.get("/management/env-data/stations/air", airRender.getAirPage);
  router.post("/management/env-data/stations/air/datatables", airRender.fetchDataTables);
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
